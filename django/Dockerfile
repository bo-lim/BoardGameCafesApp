FROM python:3
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app
RUN pip install -r requirements.txt
EXPOSE 8000
COPY . /usr/src/app
#RUN python3 manage.py makemigrations
#RUN python3 manage.py migrate
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"] 