from django.urls import path,include

from . import views
app_name='imagelist'
urlpatterns = [
    path('', views.index, name='index'),
    path('', include('django.contrib.auth.urls')),
    path('registration', views.NewUser, name='register'),
    path('log', views.logout_view, name='log'),
    path('getimage', views.upload_file, name='getimage'),
    path('lk',views.lk,name='lk')
]
