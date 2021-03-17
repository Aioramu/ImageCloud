from django.db import models
from django.contrib.auth import get_user_model
from field_history.tracker import FieldHistoryTracker
# Create your models here.
User = get_user_model()

class ImageList(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    pub_date = models.DateTimeField('date published',auto_now=True)
    path=models.ImageField(upload_to='')

    field_history = FieldHistoryTracker(['path'])
