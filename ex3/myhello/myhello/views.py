from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Course_table

@api_view(['GET'])
def addcourse(request):
    department = request.GET.get('Department', '')
    coursetitle = request.GET.get('CourseTitle', '')
    instructor = request.GET.get('Instructor', '')

    new_course = Course_table()
    new_course.Department = department
    new_course.CourseTitle = coursetitle
    new_course.Instructor = instructor
    new_course.save()

    if coursetitle:
        return Response({"data": coursetitle + " insert!!"}, status=status.HTTP_200_OK)
    else:
        return Response({"res": "parameter is None"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def courselist(request):
    courses = Course_table.objects.all().values()
    return JsonResponse(list(courses), safe=False)