---
title: A time counter for python functions
categories: [Python,automation]
tag: Python_Automation
classify: Python_Basic
abstract: This simple function is to count the running time of a python function, call this by writing @fun_timer before your function.
titleimg:

---

### 1. How to calculate the running time of a function
We usually need to count the running time of a function to test and optimize our coding. I thereby wrote a simple function <font color="#0073aa">(fun_timer)</font> below to be called before any functions.

### 2. The code

```Python
import time
from functools import wraps  
def fun_timer(function):
    @wraps(function)
    def function_timer(*args, **kwargs):
        t0 = time.time()
        result = function(*args, **kwargs)
        t1 = time.time()
        os.system(" echo Total time running %s: %s seconds" % (function.func_name, str(t1-t0)) + " >> timecount.log")
        return result
    return function_timer   

```

### 3. Call of time counter

To call the time counter, we need to write /@fun_timer in the head of a function.
