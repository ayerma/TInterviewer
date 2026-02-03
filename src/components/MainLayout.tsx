import { JSX, createSignal, onMount, onCleanup, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import NavigationMenu from './NavigationMenu';
import SpaceSelector from './SpaceSelector';
import Breadcrumb from './Breadcrumb';

interface MainLayoutProps {
  children: JSX.Element;
}

export default function MainLayout(props: MainLayoutProps) {
  const [menuOpen, setMenuOpen] = createSignal(false);
  let menuButtonRef: HTMLButtonElement | undefined;
  let closeButtonRef: HTMLButtonElement | undefined;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen());
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen()) {
      closeMenu();
      menuButtonRef?.focus();
    }
  };

  const handleOverlayClick = () => {
    closeMenu();
    menuButtonRef?.focus();
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onCleanup(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div class="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile menu toggle button */}
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        class="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        aria-label="Toggle menu"
        aria-expanded={menuOpen()}
      >
        <Show
          when={!menuOpen()}
          fallback={
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Show>
      </button>

      {/* Navigation sidebar */}
      <aside
        class={`fixed lg:static top-0 left-0 h-screen w-80 bg-white border-r border-gray-200 transition-transform duration-300 z-40 flex flex-col ${
          menuOpen() ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-hidden={!menuOpen() && 'true'}
      >
        {/* Menu header */}
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <h2 class="text-xl font-bold text-gray-800">Topics</h2>
          <button
            ref={closeButtonRef}
            onClick={closeMenu}
            class="lg:hidden text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-colors"
            aria-label="Close menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation menu content - scrollable */}
        <div class="flex-1 overflow-y-auto">
          <NavigationMenu onNavigate={closeMenu} />
        </div>
      </aside>

      {/* Mobile overlay */}
      <Show when={menuOpen()}>
        <Portal>
          <div
            class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity"
            onClick={handleOverlayClick}
            aria-hidden="true"
          />
        </Portal>
      </Show>

      {/* Main content area */}
      <div class="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header class="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm z-10">
          <div class="flex-1 lg:flex-none">
            {/* Spacer for mobile menu button */}
            <div class="lg:hidden w-12" />
          </div>
          <div class="flex-shrink-0">
            <SpaceSelector />
          </div>
        </header>

        {/* Main content - scrollable */}
        <main class="flex-1 overflow-y-auto">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb />
            <div class="mt-4">
              {props.children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
