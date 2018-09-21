---
title: Summrize different sorting algorithms
categories: [C++, data algorithm, sorting]
tag: Sorting Algorithms
classify: Algoriithm
abstract: Sorting algorithm is one of the basic algorithms in computing theory. To make a comparison and summarize of sorting algorithm can help developer to understand and apply them in your code.
titleimg: /dsm/img/201604/videoplayback.gif
---

bubblesort:![bubblesort](/dsm/img/201604/videoplayback.gif)
mergesort:![merge](/dsm/img/201604/videoplayback-2.gif)
mergesort vs quicksort: ![mvq](/dsm/img/201604/videoplayback-3.gif)
mergesort vs heapsort: ![mvh](/dsm/img/201604/videoplayback-4.gif)
### 1. Bubble Sort
Bubble insertion, with time complexity of O(n^2) is one algorithm widely used by comparing neighbour element of one set.


* Step-1: Comparing two neighbour elements from the first, swap the two elements if the smaller one behind.
* Step-2: Repeat Step-1 until sorting finished.

```C
- void bubble_sort(int arr[], int len)
  {
    for (int i = 0; i < len - 1; i++)
      {
        for (int j = len - 1; j > i; j--)
          {
            if (arr[j] < arr[j - 1])
              {
                int temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
              }
          }
      }
  }
```
![bubblesort](/dsm/img/201604/Bubble_sort_animation.gif)

### 2. Insertion Sort
* Step-1: Divide the total set to two subsets: orderedset and unorderedset. Originally the orderedset only contains the first element of all, while the unorderedset contains other elements.
* Step-2: Insert the element of unorderedset to the right position of orderedset.
* Step-3: Repeat Step-2 until all the elements belongs to unorderedset have been inserted to the orderedset.


```C
void insert_sort(int arr[], int len)
{
    for (int i = 1; i < len; i ++)
    {
        int j = i - 1;
        int k = arr[i];
        while (j > -1 && k < arr[j] )
        {
            arr[j + 1] = arr[j];
            j --;
        }
        arr[j + 1] = k;
    }
}
```
![InsertionSort](/dsm/img/201604/Insertion_sort_animation.gif)

### 3.Quicksort
Quicksort is very efficient but not stable. the average time complexity is O(nlogn), but in worst case the time complexity is O(n^2).

Quicksort is a divide and conquer algorithm. Quicksort first divides a large array into two smaller sub-arrays: the low elements and the high elements. Quicksort can then recursively sort the sub-arrays.

* Step-1:Pick an element, called a pivot, from the array.
* Step-2:Partitioning: reorder the array so that all elements with values less than the pivot come before the pivot, while all elements with values greater than the pivot come after it (equal values can go either way). After this partitioning, the pivot is in its final position. This is called the partition operation.
* Step-3:Recursively apply the above steps to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values.

The base case of the recursion is arrays of size zero or one, which are in order by definition, so they never need to be sorted.

The pivot selection and partitioning steps can be done in several different ways; the choice of specific implementation schemes greatly affects the algorithm's performance.

```C
void quick_sort(int arr[], int left, int right)
  {
    if (left < right)
      {
        int i = left, j = right, target = arr[left];
        while (i < j)
          {
            while (i < j && arr[j] > target)
              j--;
              if (i < j)
              arr[i++] = arr[j];

            while (i < j && arr[i] < target)
              i++;
              if (i < j)
                arr[j] = arr[i];
              }
    arr[i] = target;
    quick_sort(arr, left, i - 1);
    quick_sort(arr, i + 1, right);
      }
  }

```
![Quick](/dsm/img/201604/Sorting_Quicksort_anim.gif)

### 4.Mergesort
Mergesort is a stable algorithm with time complexity of O(nlogn).


* Step-1: Divide the unsorted list into n sublists, each containing 1 element (a list of 1 element is considered sorted).
* Step-2: Repeatedly merge sublists to produce new sorted sublists until there is only 1 sublist remaining. This will be the sorted list.

```C
void merge(int arr[], int temp_arr[], int start_index, int mid_index, int end_index)
{
    int i = start_index, j = mid_index + 1;
    int k = 0;
    while (i < mid_index + 1 && j < end_index + 1)
    {
        if (arr[i] > arr[j])
            temp_arr[k++] = arr[j++];
        else
            temp_arr[k++] = arr[i++];
    }
    while (i < mid_index + 1)
    {
        temp_arr[k++] = arr[i++];
    }
    while (j < end_index + 1)
        temp_arr[k++] = arr[j++];

    for (i = 0, j = start_index; j < end_index + 1; i ++, j ++)
        arr[j] = temp_arr[i];
}

void merge_sort(int arr[], int temp_arr[], int start_index, int end_index)
{
    if (start_index < end_index)
    {
        int mid_index = (start_index + end_index) / 2;
        merge_sort(arr, temp_arr, start_index, mid_index);
        merge_sort(arr, temp_arr, mid_index + 1, end_index);
        merge(arr, temp_arr, start_index, mid_index, end_index);
    }
}
```
![Merge1](/dsm/img/201604/Merge_sort_animation2.gif)
![Merge2](/dsm/img/201604/Merge-sort-example-300px.gif)

### 5.Heapsort
The heapsort algorithm involves preparing the list by first turning it into a max heap. The algorithm then repeatedly swaps the first value of the list with the last value, decreasing the range of values considered in the heap operation by one, and sifting the new first value into its position in the heap. This repeats until the range of considered values is one value in length.

The steps are:

* Step-1: Call the buildMaxHeap() function on the list. Also referred to as heapify(), this builds a heap from a list in O(n) operations.
* Step-2: Swap the first element of the list with the final element. Decrease the considered range of the list by one.
* Step-3: Call the siftDown() function on the list to sift the new first element to its appropriate index in the heap.
* Step-4: Go to step 2 unless the considered range of the list is one element.

```C
void heap_adjust(int arr[], int i, int len)
{
    int child;
    int temp;

    for (; 2 * i + 1 < len; i = child)
    {
        child = 2 * i + 1;  
        if (child < len - 1 && arr[child + 1] > arr[child])
            child ++;

        if (arr[i] < arr[child])
        {
            temp = arr[i];
            arr[i] = arr[child];
            arr[child] = temp;
        }
        else
            break;
    }
}


void heap_sort(int arr[], int len)
{
    int i;

    for (int i = len / 2 - 1; i >= 0; i--)
    {
        heap_adjust(arr, i, len);
    }

    for (i = len - 1; i > 0; i--)
    {

        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heap_adjust(arr, 0, i);
    }
}
```

![heap](/dsm/img/201604/Sorting_heapsort_anim.gif)
