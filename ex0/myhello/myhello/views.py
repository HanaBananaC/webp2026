from django.http import HttpResponse
import logging

logger = logging.getLogger(__name__)

def myIndex(request):
    logger.debug("Something happened!")

    my_name = request.GET.get('name', 'CGU')
    return HttpResponse("Hello " + my_name)