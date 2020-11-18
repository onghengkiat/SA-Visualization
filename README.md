# SA-Visualization
This is a mini project created by me to practice on the jquery and bootstrap.
I am inspired by <a class="font-weight-bolder" href="http://qiao.github.io/PathFinding.js/visual/">Qiao</a> which provides the visualization on how the Searching Algorithms work to produce this web application..

## Technologies
---
1) Flask
2) JQuery
3) Bootstrap
4) HTML and CSS

## Scope of Functionalities
---
- To demonstrate the sorting algorithms in a way that could be visualized.

## User Guide
---
The website is hosted on <a class="font-weight-bolder" href="https://sa-visualization.herokuapp.com/">SA - Visualization</a>. Feel free to use it.

## Developer Guide
1) Make sure pip/pip3 and python3 is installed in your computer.
2) If you prefer to run it on a python virtual environment. Do step 3 - 4, else skip it.
3) Run "python3 -m venv env"
4) Run "source env/bin/activate"
5) Run "pip install -r requirements.txt" or "pip3 install -r requirements.txt"
6) Run "python3 run.py". Before this, make sure you are not running anything on localhost:5000.
7) Go to 127.0.0.1:5000 on you browser.
</br>

The website is hosted on heroku using docker container following this 
<a href="https://dev.to/erenaspire7/deploying-a-dockerized-flask-app-to-heroku-5h7j">guide</a>.

### Testing on localhost : 

1)Run "docker build -t (image_name)"
2)Run "docker run -it --name (container_name) -p 2000:5000 (image_name)"

**Notes: Make sure your working directory is at SA-Visualization**

### Deploy on heroku:

1) Run "heroku login".If heroku login shows browser cant be opened, then try "heroku login -i"
2) Run "heroku create (app-name)". Remember the app-link.
3) Run "git remote add (branch-name) (app-link)"
4) Run "git add ."
5) Run "git commit -m "First Commit"
6) Run "heroku stack:set container"
7) Run "git push (branch-name) master"
