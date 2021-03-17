from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.decorators import login_required
from .forms import UploadFileForm,UpdateFileForm
from .models import ImageList
from images.settings import EMAIL_HOST_USER
from django.core.mail import send_mail

User = get_user_model()
# Create your views here.
def index(request):
    return render(request,"base.html")

def NewUser(request):
    if request.method != 'POST':
        form = UserCreationForm()
    else:
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            new_user = form.save()
            login(request, new_user)
            return redirect('imagelist:index')
    context = {'form': form}
    return render(request, "register.html",context)
def logout_view(request):
    logout(request)
    return render(request,"base.html")
@login_required
def upload_file(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            instance = ImageList(user=request.user,path=request.FILES['image'])
            instance.save()
            subject="You cloud image"
            user=User.objects.get(username=request.user)
            recepient=str(user.email)
            message=str(instance.user)+";"+str(instance.pub_date)+";"+str(instance.path)
            send_mail(subject,
            message, EMAIL_HOST_USER, [recepient], fail_silently = False)
            return render(request,"base.html")
    else:
        form = UploadFileForm()
    return render(request, 'upload.html', {'form': form})
@login_required
def lk(request):
    img=ImageList.objects.filter(user=request.user)
    s=img.order_by('-pub_date')
    if request.method!='POST':
        form = UploadFileForm()
        #hist=img.get_path_history()
        return render(request,"list.html",{'form': form,'img':s,})
    else:
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            print(request.FILES['image'])
            instance=ImageList.objects.get(pk=request.POST['id'])
            instance.path=request.FILES['image']
            instance.save()
            #ins=request.data.id
        return render(request,"list.html",{'form': form,'img':s})
