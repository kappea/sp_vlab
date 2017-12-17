from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'mainscreen/index.html')

def welkom(request):
    return render(request, 'mainscreen/welkom.html')
