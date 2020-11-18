from flask import render_template,request
from app.init import app

@app.route("/")
def home():
    return render_template("about.html")

@app.route("/quick_sort")
def quick_sort():
    return render_template("quick_sort.html")


@app.route("/merge_sort")
def merge_sort():
    return render_template("merge_sort.html")

@app.route("/bubble_sort")
def bubble_sort():
    return render_template("bubble_sort.html")
    
@app.route("/selection_sort")
def selection_sort():
    return render_template("selection_sort.html")

@app.route("/insertion_sort")
def insertion_sort():
    return render_template("insertion_sort.html")