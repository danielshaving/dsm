---
title: Adding header and footer to some files by Python
categories: [Python,automation]
tag: Python_Automation
classify: Python_Basic
abstract: If you need to add some similar texts to a serie of file, you need use Python to do some automation works to save your working time.
titleimg:

---

### 1. Prepare the files to be inserted
* Content.txt in a Path.
* header.txt to be inserted in the head of content.txt.
* footer.txt to be inserted in the foot of content.txt.

### 2. Functions
* <font color="#0073aa">add_footer(infile, outfile)</font>: insert the footer content to the foot. For the 2 parameters, 'infile' is the file which you want to insert (like 'footer.txt'); 'outfile' is the file to be inserted (like 'content.txt')
* <font color="#0073aa">add_header(infile, outfile, auto = True)</font>: insert the header content to the head. For the 2 parameters, 'infile' is the file which you want to insert (like 'header.txt'); 'outfile' is the file to be inserted (like 'content.txt'); If auto is false, meaning that some extra information was required (such as the creating time of file, the title, etc...)
* <font color="#0073aa">addHeadAndFooter(path, header, footer, auto=False)</font>: The core function to call add_header and add_footer for adding nominated header and footer in all the files of <i>Path</i>;If auto is false, meaning that some extra information was required (such as the creating time of file, the title, etc...)
* <font color="#0073aa">getStdTime(seconds)</font>: Transfer the time format to regular one, like YYYY-MM-DD HH:MM

### 3. The code

```Python
import os,time
def add_footer(infile, outfile):
    with open(infile,'r') as inputfile:
        with open(outfile,'a') as outfile:
            outfile.write("\n\n"+''.join(inputfile.readlines()))
#If auto==True，directly write the header content to current file
def add_header(infile, outfile, auto=True):
    inf=open(infile,'r')
    outf = open(outfile,'r')
    header = inf.readlines()
    content=outf.readlines()
    if auto==True:
        with open(outfile,'w') as output:
            output.write(''.join(header)+ "\n\n" \
                            +''.join(content))  
#If auto==False，add title and creating time in the header
    else:
        ctime=getStdTime(os.path.getctime(outfile))
        title="title: " + outfile.split('/')[1].split('.')[0]
        print title
        add_content="---\n"
        add_content=add_content+title+'\n'  #add title
        add_content=add_content+ctime +'\n' #add date
        add_content=add_content+''.join(header)
        with open(outfile,'w') as output:
            output.write(''.join(add_content)+ "\n\n" \
                        +''.join(content))  
    outf.close()
    inf.close()
def addHeadAndFooter(path, header, footer, auto=False):
    filelist=os.listdir(path)
    for eachfile in filelist:
        add_header(header,path + "/" + eachfile, auto)
        add_footer(footer,path + "/" + eachfile)       
def getStdTime(seconds):
    x = time.localtime(seconds)
    return "date: "+ time.strftime('%Y-%m-%d %H:%M:%S',x)        
if __name__=='__main__':
    if (len(os.sys.argv)<4):
        raise TypeError()
    else:
        print "os.sys.arg"
    #path="path"
    #header="head.md"
    #footer="footer.md"
    os.chdir(".")
    path=os.sys.argv[1]
    print path
    header=os.sys.argv[2]
    footer=os.sys.argv[3]
    filelist=os.listdir(path)
    addHeadAndFooter(path,header,footer)
    print "Success added!"    
#----------------    
# command
# python AddHead.py "path" "header.txt" "footer.txt"
#----------------
```
