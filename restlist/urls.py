from django.urls import path,include
from django.conf.urls import url
from . import views

app_name='usercase'
urlpatterns = [
    #path('login/', views.login_view, name='login'),
    #path('registration/', views.NewUser, name='register'),
    url(r'^registration/$',views.NewUser,name='register'),
    url(r'^lk/$',views.lk,name='person'),
    url(r'^upload/$',views.upload_file,name='add'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
]
