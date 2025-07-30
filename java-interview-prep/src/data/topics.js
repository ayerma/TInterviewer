export const topics = [
  {
    id: 'java-core',
    name: 'Java Core',
    subtopics: [
      {
        id: 'collections',
        name: 'Collections',
        subtopics: [
          {
            id: 'arraylist-vs-linkedlist',
            name: 'ArrayList vs. LinkedList',
            content: {
              basic: 'ArrayList is an index-based data structure backed by an array. It provides fast random access. LinkedList is a node-based data structure where each node holds a reference to the next and previous nodes. It is faster for insertions and deletions in the middle of the list.',
              middle: 'ArrayLists can have a significant overhead when resizing, as a new, larger array has to be allocated and the old array is copied to the new one. LinkedLists have a higher memory overhead due to the storage of node objects and pointers. Iterating over a LinkedList is slower than over an ArrayList because of cache misses and pointer chasing.',
              inDepth: 'The performance of ArrayList can be tuned by initializing it with an appropriate capacity to avoid resizing. For LinkedList, its performance benefits for insertions/deletions are often overstated in modern Java due to CPU cache performance. For most real-world scenarios, ArrayList is the better default choice unless you have a workload with a very high rate of insertions/deletions in the middle of the list.',
            },
          },
          {
            id: 'hashmap-vs-treemap',
            name: 'HashMap vs. TreeMap',
            content: {
              basic: 'HashMap is an unordered map that stores key-value pairs. It uses hashing for storage and provides O(1) average time complexity for get and put operations. TreeMap stores key-value pairs in a sorted order (either natural order or by a provided Comparator). It provides O(log n) time complexity for get and put operations.',
              middle: 'HashMap can have null keys and null values. TreeMap does not allow null keys but can have null values. The performance of HashMap depends on the quality of the hashCode() implementation of its keys. Poorly implemented hashCode() can lead to frequent hash collisions and degrade performance to O(n).',
              inDepth: 'Since Java 8, if a HashMap bucket becomes too large (due to hash collisions), it is converted from a linked list of entries to a balanced tree, which improves the worst-case performance from O(n) to O(log n). TreeMap is implemented using a Red-Black Tree, which is a self-balancing binary search tree.',
            },
          },
        ],
      },
      {
        id: 'multithreading',
        name: 'Multithreading',
        subtopics: [
          {
            id: 'threads-vs-processes',
            name: 'Threads vs. Processes',
            content: {
              basic: 'A process is an instance of a program in execution. Each process has its own memory space. A thread is the smallest unit of execution within a process. Multiple threads can exist within a single process and share the same memory space.',
              middle: 'Because threads share memory, communication between threads is faster and less resource-intensive than communication between processes (Inter-Process Communication). However, this also means that threads can interfere with each other, leading to concurrency issues like race conditions and deadlocks if not managed carefully.',
              inDepth: 'Context switching between threads of the same process is generally faster than context switching between processes, as the latter requires changing the virtual memory space. Modern operating systems use a thread scheduler to manage the execution of threads. The JVM also has its own thread scheduler that works with the OS scheduler.',
            },
          },
          {
            id: 'completablefuture',
            name: 'CompletableFuture',
            content: {
              basic: `CompletableFuture is used for asynchronous programming in Java. It represents a future result of an asynchronous computation. You can use it to run a task in the background and get the result later without blocking the main thread. It's an evolution of the older Future interface.`,
              middle: `CompletableFuture provides a vast array of methods for combining, composing and handling errors of asynchronous operations. For example, you can chain multiple CompletableFuture instances using 'thenApply', 'thenAccept', or 'thenRun'. 'thenApply' takes a function and applies it to the result of the future. 'thenCompose' is used to chain two futures sequentially. For error handling, you can use 'exceptionally' and 'handle'.`,
              inDepth: `Internally, CompletableFuture uses a ForkJoinPool.commonPool() by default to execute its tasks. This is a shared, static pool of threads. However, you can specify a custom Executor to have more control over the thread pool being used. This is crucial for applications with specific performance requirements or to avoid starving the common pool. You should also be aware of the different 'async' versions of methods like 'thenApplyAsync', which guarantee that the execution will happen in a different thread.`
            }
          },
        ],
      },
    ],
  },
  {
    id: 'spring-framework',
    name: 'Spring Framework',
    subtopics: [
      {
        id: 'spring-boot',
        name: 'Spring Boot',
        subtopics: [
            {
                id: 'what-is-spring-boot',
                name: 'What is Spring Boot?',
                content: {
                    basic: 'Spring Boot is a project built on top of the Spring Framework. It provides a simpler and faster way to set up, configure, and run both simple and web-based applications. It removes much of the boilerplate configuration that is required for Spring applications.',
                    middle: 'Spring Boot uses an "opinionated" approach to configuration, which means it makes assumptions about what you need and configures the application for you. This is achieved through auto-configuration, which automatically configures your Spring application based on the JAR dependencies that you have added.',
                    inDepth: 'Spring Boot Starters are a set of convenient dependency descriptors that you can include in your application. The starters contain a lot of the dependencies that you need for a specific type of application. For example, `spring-boot-starter-web` is for building web applications. You can also create your own custom starters.'
                }
            }
        ]
      }
    ]
  }
];
