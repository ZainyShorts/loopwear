from django.urls import path
from . import views 

urlpatterns = [
    path("django/pythonScript",views.SquareOcListCrreate.as_view(),name="upload-square-document"),
    path('items/', views.item_list_create, name='item-list-create'),
    path('pdf/', views.pdf_convert_jpg, name='pdf_convert_jpg'),
    path('squareMethod/', views.squareMethod, name='squareMethod'),
    path('squareMethodTest/', views.squareMethodTest, name='squareMethodTest'),
    path('delete-image/<str:public_id>/', views.delete_image_view, name='delete_image'),
]