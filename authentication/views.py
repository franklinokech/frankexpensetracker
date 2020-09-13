from django.shortcuts import render
from django.views import View
import json
from django.http import JsonResponse
from django.contrib.auth.models import User


# define API endpoint to handle username validation
class UsernameValidationView(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data['username']

        # Check if username special characters
        if not str(username).isalpha():
            # Send back json with error
            context = {
                'username_error': 'Username should only contain alphanumeric characters',
            }
            return JsonResponse(context, status=400)

        # Check if username already taken
        if User.objects.filter(username=username).exists():
            # Send back json with error
            context = {
                'username_error': 'Sorry,  the username is taken, choose another one',
            }
            return JsonResponse(context, status=409)

        # If username contains alphanumeric characters
        context = {
            'username_valid': True,
        }
        return JsonResponse(context)


# Define class based view for the register path
class RegistrationView(View):
    def get(self, request):
        return render(request, 'authentication/register.html', {})
