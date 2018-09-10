---
title: Solving urlopen and SSL CERTIFICATE_VERIFY_FAILED Error
categories: [SSL,Crawler,Python,urllib]
tag: SSL of Python
abstract: This article is to solve an SSL CERTIFICATE_VERIFY_FAILED Error when you tried to read a peer content from another website.
titleimg: /dsm/img/201503/SSL-Certificate-Image.jpeg

---

### 1. A SSL Certificate Verify Error
If you are the first time to create a crawler which on the way to read contents of some websites, the Python IDLE probably could alert an error, named SSL: CERTIFICATE_VERIFY_FAILED, look like this:

```python
from urllib.request import urlopen

base_url = "http://www.wikipedia.com"
the_http = urlopen(base_url)
```
and you must got the problem of unable to get local issuer certificate (ssl.c:1045)

![SSL_Certificate](/dsm/img/20150301/Error-Screen.png)

### 2. Python SSL Class

![SSL_Certificate](/dsm/img/20150301/SSL-Certificate-Image.jpeg)

To check this problem, I diagnoise by using the documentation of python ([Python SSLContext documentation](https://docs.python.org/2/library/ssl.html#ssl.SSLContext))

><font color="#0073aa">CLASS: SSLContext:</font>
>Create a new SSL context. You must pass protocol which must be one of the PROTOCOL_* constants defined in this module. PROTOCOL_SSLv23 is currently recommended for maximum interoperability.

Be attention to its function:

><font color="#0073aa">FUNCTION: SSLContext.verify_mode:</font>
>Whether to try to verify other peers’ certificates and how to behave if verification fails. This attribute must be one of CERT_NONE, CERT_OPTIONAL or CERT_REQUIRED.

By default the attribute is CERT_NONE:

><font color="#0073aa">CONSTANT: SSLContext.CERT_NONE:</font>
>Possible value for SSLContext.verify_mode, or the cert_reqs parameter to wrap_socket(). In this mode (the default), no certificates will be required from the other side of the socket connection. If a certificate is received from the other end, no attempt to validate it is made.

Everytime when you called url to read a website, the SSLContext will initiate this function to check the SSL of the other peer, surely you need to bypass this function !

### 3. Bypass the CERT_NONE

When calling the SSLContext constructor directly, CERT_NONE is the default. Since it does not authenticate the other peer, it can be insecure, especially in client mode where most of time you would like to ensure the authenticity of the server you’re talking to. Therefore, when in client mode, it is highly recommended to use CERT_REQUIRED.

To add to the above, if you want to know more about why you are seeing these issues you will want to have a look at PEP 476.

>This PEP proposes to enable verification of X509 certificate signatures, as well as hostname verification for Python's HTTP clients by default, subject to opt-out on a per-call basis. This change would be applied to Python 2.7, Python 3.4, and Python 3.5.

With that, we need to firstly import SSL class:

```Python
import ssl
```

And then call ssl.\_create_unverified_context() to enable verification of X509 certificate signatures, as well as hostname verification for Python's HTTP clients by default, subject to opt-out on a per-call basis.

[pep_0467](https://www.python.org/dev/peps/pep-0476/)

```Python
context = ssl._create_unverified_context()#create an enabled context
the_http = urlopen(base_url, context=context)#let the context as a parameter of urlopen
```

Final of all, you can store the http content and process it by python without alerting any error.


### 4. Final code:
```Python
import ssl
from urllib.request import urlopen

base_url = "http://www.wikipedia.com"
context = ssl._create_unverified_context()
the_http = urlopen(base_url, context=context)
```
