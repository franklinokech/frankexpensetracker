from django.shortcuts import render


# View to render homepage
def index(request):
    return render(request, 'expenses/index.html', {})


# View to handle addition of expense
def add_expenses(request):
    return render(request, 'expenses/add_expense.html', {})
