---
title: Sklearn trainning module
categories: [scikit-learn,Python]
tag: Scikit-learn
classify: Python_Basic
abstract: This article is about the saving and retrive for an SKlearn module
titleimg: /dsm/img/201503/sklearn.png


---
### Sklearn module

When doing model training, especially cross-validation on the training set, we usually need to save the model and then put it on a separate test set. The following is the preservation and reuse of the training model in Python.

In the scikit-learn library, there is already a model persistence operation, just import joblib.

```
from sklearn.externals import joblib
```

### Save the module


```
os.chdir("workspace/model_save")
from sklearn import svm
  X = [[0, 0], [1, 1]]
  y = [0, 1]
  clf = svm.SVC()
  clf.fit(X, y)  
  clf.fit(train_X,train_y)
  joblib.dump(clf, "train_model.m")
```

Save the module through the dump function of joblib, within that the clf is the training classifier.

### retrieve the module from local

```
clf = joblib.load("train_model.m")
```

The use the load function of joblib, to reload the saved module

After that one can test in the testing set.

```
clf.predit(test_X，test_y)
```
