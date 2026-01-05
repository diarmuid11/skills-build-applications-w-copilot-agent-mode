from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models

# Modelos mínimos para poblar las colecciones
class User(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=50)
    class Meta:
        app_label = 'octofit_tracker'
        managed = False
        db_table = 'users'

class Team(models.Model):
    name = models.CharField(max_length=50, unique=True)
    class Meta:
        app_label = 'octofit_tracker'
        managed = False
        db_table = 'teams'

class Activity(models.Model):
    user_email = models.EmailField()
    type = models.CharField(max_length=50)
    duration = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'
        managed = False
        db_table = 'activities'

class Leaderboard(models.Model):
    team = models.CharField(max_length=50)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'
        managed = False
        db_table = 'leaderboard'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=20)
    class Meta:
        app_label = 'octofit_tracker'
        managed = False
        db_table = 'workouts'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        from pymongo import MongoClient
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']
        # Elimina datos previos
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})
        # Crea índice único en email
        db.users.create_index([('email', 1)], unique=True)
        # Datos de ejemplo
        marvel = {'name': 'Marvel'}
        dc = {'name': 'DC'}
        db.teams.insert_many([marvel, dc])
        users = [
            {'email': 'ironman@marvel.com', 'name': 'Iron Man', 'team': 'Marvel'},
            {'email': 'spiderman@marvel.com', 'name': 'Spider-Man', 'team': 'Marvel'},
            {'email': 'batman@dc.com', 'name': 'Batman', 'team': 'DC'},
            {'email': 'wonderwoman@dc.com', 'name': 'Wonder Woman', 'team': 'DC'},
        ]
        db.users.insert_many(users)
        activities = [
            {'user_email': 'ironman@marvel.com', 'type': 'running', 'duration': 30},
            {'user_email': 'spiderman@marvel.com', 'type': 'cycling', 'duration': 45},
            {'user_email': 'batman@dc.com', 'type': 'swimming', 'duration': 60},
            {'user_email': 'wonderwoman@dc.com', 'type': 'yoga', 'duration': 40},
        ]
        db.activities.insert_many(activities)
        leaderboard = [
            {'team': 'Marvel', 'points': 75},
            {'team': 'DC', 'points': 100},
        ]
        db.leaderboard.insert_many(leaderboard)
        workouts = [
            {'name': 'Full Body Blast', 'difficulty': 'medium'},
            {'name': 'Hero HIIT', 'difficulty': 'hard'},
        ]
        db.workouts.insert_many(workouts)
        self.stdout.write(self.style.SUCCESS('octofit_db poblada con datos de prueba'))
