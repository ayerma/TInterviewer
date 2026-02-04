# Core Java Fundamentals and OOP Principles

**Total Questions:** 15  
**Last Updated:** 2026-02-04  
**Difficulty Levels:** Beginner to Advanced

---

## Table of Contents

1. [What are the four pillars of Object-Oriented Programming?](#what-are-the-four-pillars-of-object-oriented-programming)
2. [Explain the difference between JDK, JRE, and JVM.](#explain-the-difference-between-jdk-jre-and-jvm)
3. [What is the difference between == and equals() in Java?](#what-is-the-difference-between-==-and-equals()-in-java)
4. [What is method overloading and method overriding?](#what-is-method-overloading-and-method-overriding)
5. [Explain the concept of inheritance and its types in Java.](#explain-the-concept-of-inheritance-and-its-types-in-java)
6. [What is encapsulation and how is it achieved in Java?](#what-is-encapsulation-and-how-is-it-achieved-in-java)
7. [What is abstraction and how is it different from encapsulation?](#what-is-abstraction-and-how-is-it-different-from-encapsulation)
8. [Explain the concept of polymorphism with examples.](#explain-the-concept-of-polymorphism-with-examples)
9. [What is the difference between abstract class and interface?](#what-is-the-difference-between-abstract-class-and-interface)
10. [What are access modifiers in Java and explain each one?](#what-are-access-modifiers-in-java-and-explain-each-one)
11. [Explain static keyword in Java.](#explain-static-keyword-in-java)
12. [What is the final keyword in Java?](#what-is-the-final-keyword-in-java)
13. [What is the difference between String, StringBuilder, and StringBuffer?](#what-is-the-difference-between-string-stringbuilder-and-stringbuffer)
14. [Explain constructor in Java and its types.](#explain-constructor-in-java-and-its-types)
15. [What is the super keyword in Java?](#what-is-the-super-keyword-in-java)

---

## 1. What are the four pillars of Object-Oriented Programming?

The four pillars of OOP are:
1. **Encapsulation**: Bundling data (variables) and methods that operate on the data within a single unit (class), and restricting direct access to some components through access modifiers (private, protected, public).
2. **Inheritance**: A mechanism where a new class inherits properties and behaviors from an existing class, promoting code reusability.
3. **Polymorphism**: The ability of objects to take many forms, allowing methods to behave differently based on the object calling them (method overloading and overriding).
4. **Abstraction**: Hiding complex implementation details and showing only essential features to the user, achieved through abstract classes and interfaces.

---

## 2. Explain the difference between JDK, JRE, and JVM.

**JVM (Java Virtual Machine)**: The runtime engine that executes Java bytecode. It provides platform independence and manages memory through garbage collection.

**JRE (Java Runtime Environment)**: Contains the JVM along with core libraries and other components necessary to run Java applications. It includes JVM + library classes.

**JDK (Java Development Kit)**: A complete development environment that includes the JRE plus development tools like compiler (javac), debugger, and other utilities needed to develop Java applications.

Relationship: JDK = JRE + Development Tools; JRE = JVM + Library Classes

---

## 3. What is the difference between == and equals() in Java?

**== operator**: Compares references (memory addresses) for objects and values for primitives.
- For primitives: Compares actual values
- For objects: Checks if both references point to the same object in memory

**equals() method**: Compares the content/state of objects.
- Default implementation in Object class uses == (reference comparison)
- Should be overridden to provide meaningful content comparison
- String class overrides equals() to compare character sequences

Example:
```java
String s1 = new String("hello");
String s2 = new String("hello");
s1 == s2;        // false (different objects)
s1.equals(s2);   // true (same content)
```

---

## 4. What is method overloading and method overriding?

**Method Overloading (Compile-time Polymorphism)**:
- Multiple methods with the same name but different parameters in the same class
- Different parameter list: type, number, or order
- Return type can be different but cannot be the only difference
- Resolved at compile time

```java
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}
```

**Method Overriding (Runtime Polymorphism)**:
- Subclass provides specific implementation of a method declared in parent class
- Same method signature (name, parameters, return type)
- Must not have more restrictive access modifier
- Resolved at runtime
- Uses @Override annotation

```java
class Animal {
    void sound() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark"); }
}
```

---

## 5. Explain the concept of inheritance and its types in Java.

**Inheritance** is a mechanism where one class acquires the properties and behaviors of another class using the 'extends' keyword.

**Types of Inheritance**:

1. **Single Inheritance**: A class inherits from one parent class
   ```java
   class B extends A { }
   ```

2. **Multilevel Inheritance**: A class inherits from a derived class
   ```java
   class C extends B extends A { }
   ```

3. **Hierarchical Inheritance**: Multiple classes inherit from one parent
   ```java
   class B extends A { }
   class C extends A { }
   ```

4. **Multiple Inheritance**: NOT supported with classes (to avoid diamond problem), but achieved through interfaces
   ```java
   interface A { }
   interface B { }
   class C implements A, B { }
   ```

5. **Hybrid Inheritance**: Combination of multiple types, achieved through interfaces

**Key Points**:
- Java supports only single inheritance with classes
- Multiple inheritance is possible through interfaces
- Uses 'super' keyword to access parent class members
- Constructor chaining: super() must be first statement

---

## 6. What is encapsulation and how is it achieved in Java?

**Encapsulation** is the bundling of data and methods that operate on that data within a single unit (class), and restricting direct access to some components.

**How to Achieve Encapsulation**:

1. **Declare variables as private**
2. **Provide public getter and setter methods** to access and modify private variables

```java
public class Employee {
    private String name;
    private int age;
    
    // Getter
    public String getName() {
        return name;
    }
    
    // Setter with validation
    public void setAge(int age) {
        if (age > 0 && age < 150) {
            this.age = age;
        }
    }
}
```

**Benefits**:
- **Data Hiding**: Internal state is hidden from outside
- **Control**: Can add validation logic in setters
- **Flexibility**: Can change internal implementation without affecting external code
- **Increased Security**: Prevents unauthorized access
- **Read-only or Write-only**: Can provide only getter (read-only) or only setter (write-only)
- **Better Maintainability**: Changes are localized

---

## 7. What is abstraction and how is it different from encapsulation?

**Abstraction**: Hiding complex implementation details and showing only essential features. It focuses on WHAT an object does rather than HOW it does it.

**Achieved through**:
1. **Abstract Classes**: Can have both abstract and concrete methods
2. **Interfaces**: All methods are abstract by default (before Java 8)

```java
abstract class Vehicle {
    abstract void start();  // Abstract method
    void stop() {           // Concrete method
        System.out.println("Vehicle stopped");
    }
}

interface Drawable {
    void draw();  // Abstract by default
}
```

**Abstraction vs Encapsulation**:

| Aspect | Abstraction | Encapsulation |
|--------|-------------|---------------|
| Purpose | Hide complexity | Hide data |
| Focus | Design level | Implementation level |
| Implementation | Abstract classes, Interfaces | Access modifiers, getters/setters |
| Question Answered | What to do? | How to protect? |
| Example | Car interface with drive() | Private variables with public methods |

**Key Point**: Abstraction is about hiding complexity at design level, while encapsulation is about bundling data and controlling access at implementation level.

---

## 8. Explain the concept of polymorphism with examples.

**Polymorphism** means "many forms" - the ability of an object to take many forms. It allows one interface to be used for a general class of actions.

**Types of Polymorphism**:

**1. Compile-time Polymorphism (Static Binding)**:
- Achieved through method overloading
- Resolved at compile time

```java
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
}
```

**2. Runtime Polymorphism (Dynamic Binding)**:
- Achieved through method overriding
- Resolved at runtime
- Requires inheritance and method overriding

```java
class Animal {
    void makeSound() { System.out.println("Some sound"); }
}

class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Bark"); }
}

class Cat extends Animal {
    @Override
    void makeSound() { System.out.println("Meow"); }
}

// Usage
Animal animal1 = new Dog();  // Upcasting
Animal animal2 = new Cat();
animal1.makeSound();  // Output: Bark
animal2.makeSound();  // Output: Meow
```

**Benefits**:
- Code flexibility and reusability
- Loose coupling
- Easier maintenance
- Single interface for multiple implementations

---

## 9. What is the difference between abstract class and interface?

**Abstract Class vs Interface**:

| Feature | Abstract Class | Interface |
|---------|---------------|------------|
| **Keyword** | abstract | interface |
| **Methods** | Can have abstract and concrete methods | All methods abstract (before Java 8) |
| **Variables** | Can have instance variables | Only static final constants |
| **Constructors** | Can have constructors | Cannot have constructors |
| **Access Modifiers** | Any access modifier | Public by default |
| **Inheritance** | Single inheritance (extends) | Multiple inheritance (implements) |
| **Implementation** | Can provide partial implementation | No implementation (before Java 8) |
| **When to use** | When classes share common behavior | When unrelated classes share common contract |

**Java 8+ Changes**:
- Interfaces can have default and static methods
- Can have private methods (Java 9+)

```java
// Abstract Class
abstract class Animal {
    String name;  // Instance variable
    
    Animal(String name) {  // Constructor
        this.name = name;
    }
    
    abstract void makeSound();  // Abstract method
    
    void sleep() {  // Concrete method
        System.out.println(name + " is sleeping");
    }
}

// Interface
interface Flyable {
    int MAX_SPEED = 100;  // static final constant
    
    void fly();  // Abstract method
    
    default void land() {  // Default method (Java 8+)
        System.out.println("Landing...");
    }
}
```

**Rule of Thumb**:
- Use abstract class for IS-A relationship with common behavior
- Use interface for CAN-DO capability across unrelated classes

---

## 10. What are access modifiers in Java and explain each one?

Access modifiers control the visibility and accessibility of classes, methods, and variables.

**Four Access Modifiers**:

**1. private**:
- Accessible only within the same class
- Most restrictive
- Used for encapsulation

**2. default (package-private)**:
- No keyword needed
- Accessible within the same package only
- Not accessible from other packages

**3. protected**:
- Accessible within the same package
- Accessible in subclasses (even in different packages)
- Cannot be applied to top-level classes

**4. public**:
- Accessible from anywhere
- Least restrictive

**Visibility Table**:

| Modifier | Same Class | Same Package | Subclass | Other Packages |
|----------|------------|--------------|----------|----------------|
| private | ✓ | ✗ | ✗ | ✗ |
| default | ✓ | ✓ | ✗ | ✗ |
| protected | ✓ | ✓ | ✓ | ✗ |
| public | ✓ | ✓ | ✓ | ✓ |

```java
public class Example {
    private int privateVar;      // Only in this class
    int defaultVar;              // Package-private
    protected int protectedVar;  // Package + subclasses
    public int publicVar;        // Everywhere
}
```

**Best Practices**:
- Keep variables private
- Use public for API methods
- Use protected for methods meant for inheritance
- Default for package-internal utilities

---

## 11. Explain static keyword in Java.

**static** keyword is used for memory management and belongs to the class rather than instances.

**Uses of static**:

**1. Static Variables (Class Variables)**:
- Shared among all instances
- Memory allocated once at class loading
- Accessed via class name

```java
class Counter {
    static int count = 0;  // Shared by all objects
    
    Counter() {
        count++;
    }
}
```

**2. Static Methods**:
- Can be called without creating an object
- Can only access static members directly
- Cannot use 'this' or 'super' keywords

```java
class MathUtil {
    static int add(int a, int b) {
        return a + b;
    }
}
// Call: MathUtil.add(5, 3);
```

**3. Static Blocks**:
- Executed when class is loaded (before main method)
- Used for static initialization

```java
class Database {
    static Connection conn;
    
    static {
        // Initialize connection
        conn = DriverManager.getConnection(url);
    }
}
```

**4. Static Nested Classes**:
- Can access only static members of outer class
- Don't need outer class instance

```java
class Outer {
    static class Inner {
        void display() { }
    }
}
```

**Key Points**:
- Static members belong to class, not objects
- Loaded when class is loaded
- Memory efficient (single copy)
- Cannot access instance variables directly
- Common uses: utility methods, constants, counters

---

## 12. What is the final keyword in Java?

**final** keyword is used to apply restrictions and make things immutable.

**Uses of final**:

**1. Final Variables (Constants)**:
- Value cannot be changed once assigned
- Must be initialized when declared or in constructor
- Convention: Use UPPERCASE with underscores

```java
final int MAX_VALUE = 100;
final double PI = 3.14159;

class Config {
    final String DB_URL;  // Blank final variable
    
    Config(String url) {
        this.DB_URL = url;  // Initialized in constructor
    }
}
```

**2. Final Methods**:
- Cannot be overridden by subclasses
- Used to prevent modification of critical behavior

```java
class Parent {
    final void display() {
        System.out.println("Cannot override this");
    }
}

class Child extends Parent {
    // void display() { }  // Compilation error
}
```

**3. Final Classes**:
- Cannot be extended/inherited
- Prevents inheritance
- Examples: String, Integer, System classes

```java
final class ImmutableClass {
    // Cannot be inherited
}

// class SubClass extends ImmutableClass { }  // Error
```

**4. Final Parameters**:
- Method parameters cannot be modified inside the method

```java
void process(final int value) {
    // value = 20;  // Compilation error
}
```

**Benefits**:
- **Security**: Prevents unwanted modifications
- **Thread Safety**: Immutable objects are thread-safe
- **Performance**: JVM can optimize final variables
- **Design**: Clearly indicates immutability

**Important Notes**:
- final variable: value immutable
- final reference: reference immutable (object content can change)
- final method: implementation immutable
- final class: inheritance immutable

---

## 13. What is the difference between String, StringBuilder, and StringBuffer?

**String vs StringBuilder vs StringBuffer**:

| Feature | String | StringBuilder | StringBuffer |
|---------|--------|---------------|-------------|
| **Mutability** | Immutable | Mutable | Mutable |
| **Thread Safety** | Yes (immutable) | No | Yes (synchronized) |
| **Performance** | Slow for modifications | Fast | Slower than StringBuilder |
| **Memory** | Creates new object on change | Modifies same object | Modifies same object |
| **When to use** | Fixed strings | Single-threaded string manipulation | Multi-threaded string manipulation |

**String (Immutable)**:
```java
String s = "Hello";
s = s + " World";  // Creates new String object
// Original "Hello" object remains in memory (garbage)
```

**StringBuilder (Mutable, Not Synchronized)**:
```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");  // Modifies same object
String result = sb.toString();
// Best for single-threaded scenarios
```

**StringBuffer (Mutable, Synchronized)**:
```java
StringBuffer sbf = new StringBuffer("Hello");
sbf.append(" World");  // Thread-safe, modifies same object
String result = sbf.toString();
// Best for multi-threaded scenarios
```

**Performance Comparison**:
- String concatenation in loop: Creates multiple objects (very slow)
- StringBuilder: Fast, no synchronization overhead
- StringBuffer: Slightly slower due to synchronization

**Common Methods**:
- append(), insert(), delete(), replace(), reverse()
- capacity(), length(), charAt()

**Best Practice**:
- Use String for fixed/constant strings
- Use StringBuilder for string manipulation (most common)
- Use StringBuffer only when thread safety is required
- For small concatenations, String is fine (compiler optimizes)

---

## 14. Explain constructor in Java and its types.

**Constructor** is a special method used to initialize objects. It has the same name as the class and no return type.

**Types of Constructors**:

**1. Default Constructor (No-arg)**:
- No parameters
- Compiler provides if no constructor is defined
- Initializes instance variables with default values

```java
class Student {
    String name;
    int age;
    
    // Default constructor
    Student() {
        name = "Unknown";
        age = 0;
    }
}
```

**2. Parameterized Constructor**:
- Takes parameters to initialize object with specific values
- Enables object creation with different initial states

```java
class Student {
    String name;
    int age;
    
    // Parameterized constructor
    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

**3. Copy Constructor**:
- Creates object by copying values from another object
- Not automatically provided (must be implemented)

```java
class Student {
    String name;
    int age;
    
    // Copy constructor
    Student(Student other) {
        this.name = other.name;
        this.age = other.age;
    }
}
```

**Constructor Chaining**:
- Calling one constructor from another using this() or super()

```java
class Student {
    String name;
    int age;
    
    Student() {
        this("Unknown", 0);  // Calls parameterized constructor
    }
    
    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

**Key Points**:
- Constructor name must match class name
- No return type (not even void)
- Called automatically when object is created
- Can be overloaded
- this() or super() must be first statement
- If you define any constructor, compiler won't provide default
- Cannot be abstract, static, final, or synchronized

---

## 15. What is the super keyword in Java?

**super** keyword is a reference variable used to refer to the immediate parent class object.

**Uses of super keyword**:

**1. Access Parent Class Variables**:
- When child and parent have same variable names

```java
class Parent {
    int num = 10;
}

class Child extends Parent {
    int num = 20;
    
    void display() {
        System.out.println(num);        // 20 (child)
        System.out.println(super.num);  // 10 (parent)
    }
}
```

**2. Call Parent Class Methods**:
- When child overrides parent method but wants to call parent version

```java
class Parent {
    void display() {
        System.out.println("Parent display");
    }
}

class Child extends Parent {
    @Override
    void display() {
        super.display();  // Call parent method
        System.out.println("Child display");
    }
}
```

**3. Call Parent Class Constructor**:
- Must be first statement in child constructor
- If not explicitly called, compiler adds super() automatically

```java
class Parent {
    Parent() {
        System.out.println("Parent constructor");
    }
    
    Parent(String msg) {
        System.out.println("Parent: " + msg);
    }
}

class Child extends Parent {
    Child() {
        super("Hello");  // Call parameterized parent constructor
        System.out.println("Child constructor");
    }
}
```

**this vs super**:

| Aspect | this | super |
|--------|------|-------|
| Reference | Current class | Parent class |
| Usage | Access current class members | Access parent class members |
| Constructor | this() calls current class constructor | super() calls parent class constructor |
| When used | Differentiate between instance and local variables | Access overridden methods/variables |

**Important Rules**:
- super() must be first statement in constructor
- Cannot use both this() and super() in same constructor
- super can be used in methods to call parent implementation
- Cannot use super in static context

---

## Additional Resources

- [Official Java Documentation](https://docs.oracle.com/en/java/)
- [Java OOP Concepts](https://docs.oracle.com/javase/tutorial/java/concepts/)
- [Effective Java by Joshua Bloch](https://www.oreilly.com/library/view/effective-java/9780134686097/)

## Contributing

Found an error or have a suggestion? Feel free to contribute by:
- Opening an issue
- Submitting a pull request
- Suggesting new questions

---

*Generated from interview question content creator*
