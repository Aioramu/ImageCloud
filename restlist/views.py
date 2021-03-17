from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.decorators import login_required
from imagelist.models import ImageList
from images.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser,FileUploadParser

from PIL import Image

User = get_user_model()
# Create your views here.
class ImageUploadParser(FileUploadParser):
    media_type = 'image/*'


@api_view(['GET','POST'])#registration on base django model
def NewUser(request):
    if request.method == 'POST':

        data={'user':request.data['username'],'password':request.data['password'],'email':request.data['email']}
        try:
            user = User.objects.create_user(request.data['username'], request.data['email'], request.data['password'])

            return Response({'data':"Thanks for registration!"})
        except:
            return Response({'data':'error 404'})
    return Response({'data':"nothing"})
def logout_view(request):
    logout(request)
    return render(request,"base.html")
@api_view(['GET','POST'])
def upload_file(request):
    parser_classes = [ImageUploadParser]
    if request.method == 'POST':
        #print(request.data,request.FILES)
        instance = ImageList(user=request.user,path=request.FILES['image'])
        instance.save()
        subject="You cloud image"
        user=User.objects.get(username=request.user)
        recepient=str(user.email)
        message=str(instance.user)+";"+str(instance.pub_date)+";"+str(instance.path)
        send_mail(subject,
        message, EMAIL_HOST_USER, [recepient], fail_silently = False)
        return Response(status=204)

        #form = UploadFileForm()
    return Response(status=404)
@api_view(['GET','POST'])
def lk(request):

    permission_classes = [permissions.IsAuthenticated]#only for auth user
    img=ImageList.objects.filter(user=request.user)
    s=img.order_by('-pub_date')
    if request.method!='POST':
        bad=[]
        for i in s:
            l=i.get_path_history()
            n=[]
            for ass in l:
                n.append({"value":str(ass.field_value),"date":str(ass.date_created)})
            bad.append({"id":str(i.pk),"path":str(i.path),"pub_date":str(i.pub_date),"history":n})
        #print(bad)
        return Response({'data':bad})
        #hist=img.get_path_history():
    else:
        parser_classes = [ImageUploadParser]
        instance=ImageList.objects.get(pk=request.data['id'])
        instance.path=request.FILES['image']
        instance.save()
            #ins=request.data.id
        return Response(status=204)
