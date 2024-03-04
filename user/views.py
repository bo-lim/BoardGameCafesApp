from django.shortcuts import get_object_or_404, render
import jwt

from rest_framework.views import APIView

from diceBackendProject.settings import SECRET_KEY
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.shortcuts import render, get_object_or_404

class CheckView(APIView):
    def get(self, request):
        queryset = User.objects.filter(email__exact=request.GET['email'])
        if queryset.count() > 0:
            return Response({"message":"exist"}, status=status.HTTP_200_OK)
        else:
            return Response({"message":"notExist"}, status=status.HTTP_200_OK)
        
class MyPageView(APIView):
    def post(self, request):
        
        User.objects.filter(email__exact=request.POST['email']).update(nickname=request.POST['nickname'],
                                                                            gender=request.POST['gender'],
                                                                            age=request.POST['age'])
        return Response(status=status.HTTP_202_ACCEPTED)
        '''
        try:
            access = request.COOKIES.get('access')ss
            print('accesss')
            payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
            pk = payload.get('user_id')
            user = get_object_or_404(User, pk=pk)
        except(jwt.exceptions.ExpiredSignatureError):
            data = {'refresh': request.COOKIES.get('refresh', None)}
            serializer = TokenRefreshSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                access = serializer.data.get('access', None)
                refresh = serializer.data.get('refresh', None)
                print('refresh')
                payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
                pk = payload.get('user_id')
                user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(instance=user)
        token = TokenObtainPairSerializer.get_token(user)
        refresh_token = str(token)
        access_token = str(token.access_token)
        res = Response(
            {
                "user": serializer.data,
                "message": "successs",
                "token": {
                    "access": access_token,
                    "refresh": refresh_token,
                },
            },
            status=status.HTTP_200_OK,
        )
        res.delete_cookie("access")
        res.delete_cookie("refresh")

        res.set_cookie("access", access_token, httponly=True)
        res.set_cookie("refresh", refresh_token, httponly=True)
        return res
        '''


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "register successs",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            
            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)
            
            return res
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AuthView(APIView):
    def get(self, request):
        try:
            access = request.COOKIES['access']
            payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
            pk = payload.get('user_id')
            user = get_object_or_404(User, pk=pk)
            serializer = UserSerializer(instance=user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except(jwt.exceptions.ExpiredSignatureError):
            data = {'refresh': request.COOKIES.get('refresh', None)}
            serializer = TokenRefreshSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                access = serializer.data.get('access', None)
                refresh = serializer.data.get('refresh', None)
                payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
                pk = payload.get('user_id')
                user = get_object_or_404(User, pk=pk)
                serializer = UserSerializer(instance=user)
                res = Response(serializer.data, status=status.HTTP_200_OK)
                res.set_cookie('access', access)
                res.set_cookie('refresh', refresh)
                return res
            raise jwt.exceptions.InvalidTokenError

        except(jwt.exceptions.InvalidTokenError):
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        user = authenticate(
            email=request.data.get("email"), password=request.data.get("password")
        )
        if user:
            serializer = UserSerializer(user)
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "login success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )

            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)
            return res
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        response = Response({
            "message": "Logout success"
            }, status=status.HTTP_202_ACCEPTED)
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response