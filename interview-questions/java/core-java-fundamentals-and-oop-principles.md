# Core Java Fundamentals and OOP Principles

**Topic:** Core Java Fundamentals and OOP Principles  
**Total Questions:** 10  
**Source:** Auto-generated from Jira ticket IN-43  
**Generated:** 2026-02-05

---

## Table of Contents

1. [What are the four pillars of Object-Oriented Programming?](#1-what-are-the-four-pillars-of-object-oriented-programming)
2. [Explain the difference between method overloading and method overriding](#2-explain-the-difference-between-method-overloading-and-method-overriding)
3. [What is the difference between abstract classes and interfaces in Java?](#3-what-is-the-difference-between-abstract-classes-and-interfaces-in-java)
4. [What is encapsulation and how do you achieve it in Java?](#4-what-is-encapsulation-and-how-do-you-achieve-it-in-java)
5. [Explain the concept of polymorphism with examples](#5-explain-the-concept-of-polymorphism-with-examples)
6. [What is the difference between == and equals() method in Java?](#6-what-is-the-difference-between--and-equals-method-in-java)
7. [What is the String pool in Java and why is it used?](#7-what-is-the-string-pool-in-java-and-why-is-it-used)
8. [Explain the concept of constructor chaining in Java](#8-explain-the-concept-of-constructor-chaining-in-java)
9. [What is the final keyword and its uses in Java?](#9-what-is-the-final-keyword-and-its-uses-in-java)
10. [What are static blocks and when are they executed?](#10-what-are-static-blocks-and-when-are-they-executed)

---

## Questions and Answers

### 1. What are the four pillars of Object-Oriented Programming?

**Answer:**

The four pillars of OOP are:

1. **Encapsulation** - bundling data and methods that operate on that data within a single unit (class), hiding internal details.

2. **Inheritance** - mechanism where a class can inherit properties and methods from another class, promoting code reuse.

3. **Polymorphism** - ability of objects to take multiple forms, allowing methods to do different things based on the object they are acting upon.

4. **Abstraction** - hiding complex implementation details and showing only essential features to the user.

---

### 2. Explain the difference between method overloading and method overriding

**Answer:**

Method overloading occurs when multiple methods in the same class have the same name but different parameters (compile-time polymorphism). Method overriding happens when a subclass provides a specific implementation of a method already defined in its parent class (runtime polymorphism).

Overloading is resolved at compile time based on method signature, while overriding is resolved at runtime based on the actual object type.

**Key Differences:**
- **Overloading**: Same class, same method name, different parameters, compile-time
- **Overriding**: Parent-child relationship, same method signature, runtime

---

### 3. What is the difference between abstract classes and interfaces in Java?

**Answer:**

**Abstract Classes:**
- Can have both abstract and concrete methods
- Can have constructors and instance variables
- Can use any access modifier
- A class can extend only one abstract class
- Use when classes share common code or state

**Interfaces:**
- Prior to Java 8: only abstract methods and constants
- Java 8+: can have default and static methods
- Cannot have constructors or instance variables
- A class can implement multiple interfaces
- Use for contracts and defining capabilities

**Rule:** A class can implement multiple interfaces but extend only one abstract class.

---

### 4. What is encapsulation and how do you achieve it in Java?

**Answer:**

Encapsulation is the bundling of data (variables) and methods that operate on the data into a single unit (class), while restricting direct access to some components.

**How to achieve in Java:**

1. **Declare class variables as private**
   ```java
   private String name;
   private int age;
   ```

2. **Provide public getter and setter methods**
   ```java
   public String getName() { return name; }
   public void setName(String name) { this.name = name; }
   ```

3. **Use access modifiers** (private, protected, public) to control visibility

**Benefits:**
- Data hiding
- Increased flexibility
- Code reusability
- Easy testing and maintenance

---

### 5. Explain the concept of polymorphism with examples

**Answer:**

Polymorphism means 'many forms' and allows objects to be treated as instances of their parent class.

**Two Types:**

**1. Compile-time (Static) Polymorphism** - achieved through method overloading
```java
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}
```

**2. Runtime (Dynamic) Polymorphism** - achieved through method overriding
```java
class Animal {
    void sound() { System.out.println("Animal makes sound"); }
}

class Dog extends Animal {
    void sound() { System.out.println("Dog barks"); }
}

// Usage
Animal animal = new Dog();
animal.sound(); // Outputs: "Dog barks" (resolved at runtime)
```

---

### 6. What is the difference between == and equals() method in Java?

**Answer:**

**== Operator:**
- Reference comparison operator
- Checks if two references point to the same object in memory (compares memory addresses)
- For primitives, compares actual values

**equals() Method:**
- Used for content comparison
- Checks if two objects are logically equivalent
- String class overrides equals() to compare character sequences
- For custom objects, equals() should be overridden to define logical equality

**Example:**
```java
String s1 = new String("hello");
String s2 = new String("hello");

System.out.println(s1 == s2);        // false (different objects in memory)
System.out.println(s1.equals(s2));   // true (same content)
```

---

### 7. What is the String pool in Java and why is it used?

**Answer:**

The **String pool** (String intern pool) is a special memory region in the Java heap where String literals are stored to optimize memory usage.

**How it works:**
1. When a String literal is created, JVM checks if an identical string already exists in the pool
2. If yes → returns the reference to the existing string
3. If no → creates a new string and adds it to the pool

**Benefits:**
- Reduces memory consumption
- Improves performance through string interning
- Enables efficient string comparison

**Example:**
```java
String s1 = "hello";              // In string pool
String s2 = "hello";              // References same object in pool (s1 == s2 is true)
String s3 = new String("hello");  // In heap, not in pool (s1 == s3 is false)
```

---

### 8. Explain the concept of constructor chaining in Java

**Answer:**

Constructor chaining is the process of calling one constructor from another constructor in the same class or parent class.

**Rules:**
- Use `this()` to call another constructor in the same class
- Use `super()` to call parent class constructor
- Must be the first statement in the constructor
- Java automatically calls `super()` if not explicitly called

**Example:**
```java
public class Employee {
    private String name;
    private int id;
    
    // Default constructor chains to parameterized constructor
    public Employee() {
        this("Unknown", 0);  // Must be first statement
    }
    
    public Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }
}
```

**Benefits:**
- Code reuse
- Centralized initialization logic
- Reduces code duplication

---

### 9. What is the final keyword and its uses in Java?

**Answer:**

The `final` keyword is used to restrict modification and has three main uses:

**1. Final Variables** - creates constants
```java
final int MAX_SIZE = 100;  // Cannot be reassigned
final List<String> list = new ArrayList<>();  // Reference cannot change, but object state can
```

**2. Final Methods** - prevents method overriding
```java
class Parent {
    final void display() {
        // Cannot be overridden in subclass
    }
}
```

**3. Final Classes** - prevents inheritance
```java
final class ImmutableClass {
    // Cannot be extended (e.g., String, Integer)
}
```

**Benefits:**
- Security and immutability
- Thread safety
- JVM optimization opportunities
- Clear contract about what can't be changed

**Note:** Blank final variables must be initialized in constructor.

---

### 10. What are static blocks and when are they executed?

**Answer:**

Static blocks (static initializers) are code blocks marked with the `static` keyword used to initialize static variables or execute code when a class is loaded.

**Execution:**
- Executed only once when the class is first loaded into memory by the ClassLoader
- Happens before any object creation or static method calls
- Execute in the order they appear in the class

**Example:**
```java
public class Configuration {
    static String dbUrl;
    static int maxConnections;
    
    // Static block
    static {
        System.loadLibrary("nativeLib");
        dbUrl = loadFromConfig("db.url");
        maxConnections = 100;
        System.out.println("Configuration loaded");
    }
    
    // Another static block (executes second)
    static {
        validateConfiguration();
    }
}
```

**Use Cases:**
- Complex static variable initialization
- Loading native libraries
- Registering database drivers
- One-time setup operations

**Limitations:**
- Cannot access instance variables
- Cannot throw checked exceptions directly

---

## Summary

This document contains 10 essential interview questions covering Core Java Fundamentals and Object-Oriented Programming Principles. These questions cover:

- **OOP Concepts**: Encapsulation, Inheritance, Polymorphism, Abstraction
- **Java Fundamentals**: String pool, equals vs ==, final keyword, static blocks
- **Advanced Topics**: Constructor chaining, method overloading vs overriding, abstract classes vs interfaces

**Recommended Study Path:**
1. Understand the four OOP pillars thoroughly
2. Practice implementing polymorphism and encapsulation
3. Master the differences between similar concepts (overloading vs overriding, == vs equals)
4. Write code examples for each concept
5. Understand memory implications (String pool, static blocks)

---

**Generated by:** Content-Creator workflow  
**Jira Ticket:** IN-43  
**Date:** 2026-02-05
