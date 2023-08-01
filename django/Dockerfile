FROM python:3.9-slim
WORKDIR /
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
# CMD exec gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 3 
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]