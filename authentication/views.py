from django.shortcuts import render
from django.views import View
import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from validate_email import validate_email


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


# define API endpoint to validate email
class EmailValidationView(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']

        # Check if email is not valid
        if not validate_email(email):
            # Send back json with error
            context = {
                'email_error': 'Email address is invalid',
            }
            return JsonResponse(context, status=400)

        # Check if email is already taken
        if User.objects.filter(email=email).exists():
            # Send back json with error
            context = {
                'email_error': 'Sorry,  the email address is taken, choose another one',
            }
            return JsonResponse(context, status=409)

        # otherwise return true for valid email address
        context = {
            'email_valid': True,
        }
        return JsonResponse(context)





# Define class based view for the register path
class RegistrationView(View):
    def get(self, request):
        return render(request, 'authentication/register.html', {})
