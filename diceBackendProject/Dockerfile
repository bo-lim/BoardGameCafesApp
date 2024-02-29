FROM python:3
WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install -r requirements.txt
EXPOSE 8000
COPY . .
#RUN sleep 1
#RUN python3 manage.py makemigrations
#RUN sleep 1
#RUN python3 manage.py migrate
CMD ["python", "./manage.py", "runserver", "0.0.0.0:8000"] 
#CMD ["gunicorn", "--bind", "0.0.0.0:8000", "diceBackendProject.wsgi:application"] 