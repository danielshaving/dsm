---
title: Installing Python and related library in the Linux environnment
categories: [Python,Linux,Library]
tag: Installing_Python_in_Linux
classify: Python_Basic
abstract: For non-root users, knowing how to install the Python and related libraries is the required skill for using Linux.I summarize some basic command to install Python and related libraries in the Linux environnment.
titleimg:

---

### 1. Installing Python
Here one could find the Python version library <a href="https://www.python.org/ftp/python/">https://www.python.org/ftp/python/</a>. As an example, I chose the version 2.7.5, then command by --prefix to define the installation path:

```Linux
wget https://www.python.org/ftp/python/2.7.5/Python-2.7.5.tgz
tar -xzf Python-2.7.5.tgz
cd Python-2.7.5
mkdir -p /home/liudiwei/software/python27
./configure --prefix="/home/liudiwei/software/python27"
make
make install
```

### 2. Installing setuptools
Setuptools are prepared for installing pip, the following commands used the directory of python/home/liudiwei/software/python27/bin/python:

```Linux
wget --no-check-certificate http://pypi.python.org/packages/source/s/setuptools/setuptools-2.0.tar.gz
tar -xzvf setuptools-2.0.tar.gz
cd setuptools-2.0
/home/liudiwei/software/python27/bin/python setup.py install
```

### 3. Installing pip
pip is a very simple tool to install the libararies. Here I installed the setup in the directory of python/home/liudiwei/software/python27/bin/python

```Linux
wget --no-check-certificate https://pypi.python.org/packages/41/27/9a8d24e1b55bd8c85e4d022da2922cb206f183e2d18fee4e320c9547e751/pip-8.1.1.tar.gz#md5=6b86f11841e89c8241d689956ba99ed7
tar -xzf pip-8.1.1.tar.gz
cd pip-8.1.1
/home/liudiwei/software/python27/bin/python setup.py install
```

### 4. Installing the related libraries
* simplejson
* redis
* numpy
* scipy
* sklearn

```Linux
cd /home/liudiwei/software/python27/bin/
./pip install simplejson
./pip install redis
./pip install numpy
./pip install scipy
./pip install sklearn
```

### 5. Customize alias of commands
If you want to customize some commands, such as using mypython to run python, you only need to configure the ~/.bashrc file:

```Linux
vim ~/.bashrc
```

and add the following code in the end of coding files
```pyton
alias mypython='/home/liudiwei/software/python27/bin/python'
```

Alias : mypython command will be successfully customized after you validated the command of :

```Linux
source ~/.bashrc
```
