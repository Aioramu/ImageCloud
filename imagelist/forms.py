from django import forms

class UploadFileForm(forms.Form):
    image = forms.ImageField()
class UpdateFileForm(forms.Form):
    object=forms.IntegerField()
    image = forms.ImageField()
