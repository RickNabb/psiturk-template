# N/A Trust Study

#### Authors: Nick Rabb, Theresa Law, Meia Chita-Tegmark

## Table of Contents

* [Installation](installation)

## Installation

This project contains files necessary to run a study on PsiTurk - an Amazon Mechanical Turk package. For instructions on how to interact with the HRI Lab PsiTurk platform, please check out the [Wiki Page](https://hrilab.tufts.edu/wiki/index.php/Psiturk_Studies).

> Note: You need to be using **Python 2** in order to use PsiTurk. All the below `python` commands should be using Python 2.7 or lower. See [docs](https://psiturk.readthedocs.io/en/stable/install.html) for more info.

To run/develop this experiment locally, you will need to install some Python libraries. To do this, you can use `pip`. To make sure you have `pip` installed on your machine, simply run the command:

```
$ pip --version
```

And you should see something like:

```
pip 20.1 from /usr/local/lib/python2.7/dist-packages/pip (python 2.7)
```

If you need to install `pip`, run (on Ubuntu):

```
$ sudo apt install python-pip
```


We need to install the `psiturk` package, so run

```
$ python -m pip install psiturk
```

> Note: You can run all of the experimental setup inside of a virtual Python environment as well. These instructions do not cover that. It is a fairly big package, so you may want to have a predefined 'psiturk' environment you set up.

Once you have installed `psiturk` installed, you can confirm that you can run the study by running:

```
$ python herokuapp.py
```

You should be able now to navigate to `localhost:22361` in your browser to verify that the PsiTurk page is running.

## Old Instructions

Puzzlescript Experiment
Version: 01
Author: Michael Gold
Authored on: 4/19/19

Last updated: 4/19/19


Purpose: Complete puzzles and answer questions based on whether the user
         completed or ran out of time.  


Making Newer Versions: Copy this directory.
                       The files you will most likely want to update are:
                               task.js
                               template files


Updating task.js: All variables that you will likely want to change are at
                  the top of the file.  There is also block of code near the
                  top of the file for selecting which questionnaire to present
                  depending upon whether the user finished the puzzle in
                  time or not.  Otherwise, the StroopExperiment code is
                  mostly boilerplate code.  

                  Below the main StroopExperiment code is the puzzlescript
                  code.  This was computer generated by puzzlescript.  
                  A number of edits have been made in order to get the timer,
                  mouse click detection, and other aspects working properly.
                  The puzzlescript code was also edited to align with the
                  StroopExperiment code, such that it can detect whether a
                  user finished or ran out of time.  

                  TO UPDATE PUZZLES: at the top of the task.js file are
                  variables for each of the puzzles.  To replace a single
                  level, simply replace the "level" code you would like.  
                  The mechanics are currently a separate variable shared
                  between the levels.  

                  The way presenting a page works is to "shift" that page, 
                  which removed that page from the list of pages stored.
                  So, the list of pages must be written in the order
                  you would like to show them in.  

                  There is an explicitly written part of the "next" function
                  that detects whether a user finished or ran out of time on
                  the main puzzle that the questionnaire is based upon.  
                  This code is based on the variable of which pages to select
                  from at the top of the task.js file, 
                  named as "questionnaireChoices".


Updating html pages: The StroopExperiment code will generate html within
                     questionnaires, given that certain classes and
                     parameters are in the html.  Collection of data from the 
                     html pages also relies upon certain classes being
                     declared in the html.  This is specific to this task.js
                     file, and not to psiturk.  


Other files: The other files in the directory are mostly required by psiturk.  
             Several other components may need to be updated to reflect
             the specifics of the study being conducted.  These would include
             the html pages that are presented to users that give information
             on the purpose of the study.  The config.txt file may need to be
             updated if the number of variables change (see "num_conds").