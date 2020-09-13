from django.shortcuts import render
from django.views import View


# Define class based view for the register path
class RegistrationView(View):
    def get(self, request):
        return render(request, 'authentication/register.html', {})
