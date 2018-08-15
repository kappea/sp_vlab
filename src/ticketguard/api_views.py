from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def callback(request, *args, **kwargs):
    if request.method == 'POST':
        handle = kwargs.get('handle')
        print('handle = ' + handle)
        keydigest = kwargs.get('keydigest')
        print('keydigest = ' + keydigest)
        return Response({"message": "Got some data!", "data": request.data})
