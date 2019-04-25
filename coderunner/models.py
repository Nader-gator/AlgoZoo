from django.db import models


class Test(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    file_name = models.CharField(max_length=100)
    test_name = models.CharField(max_length=100)
