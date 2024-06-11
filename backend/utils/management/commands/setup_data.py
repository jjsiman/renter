import os
import random

import factory.random
from buildings.tests.factories import BuildingFactory
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import connection, transaction

# Change the seed to see different fake data
random.seed("renter")
state = random.getstate()
factory.random.set_random_state(state)


class Command(BaseCommand):
    help = "Generates fake data for testing."

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Resetting database...")
        with connection.cursor() as cursor:
            cursor.execute("DROP SCHEMA public CASCADE;")
            cursor.execute("CREATE SCHEMA public;")

        self.stdout.write("Setting up database...")
        call_command("migrate")

        self.stdout.write("Populating data...")

        self.stdout.write("1: Creating users...")
        call_command("createsuperuser", "--noinput", email="admin@renter.com")

        self.stdout.write("2. Creating buildings...")
        BuildingFactory.create_batch(10)

        self.stdout.write("Done!")
