from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='AdoptionListing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pet_name', models.CharField(max_length=100)),
                ('species', models.CharField(max_length=50)),
                ('breed', models.CharField(blank=True, max_length=100)),
                ('age_label', models.CharField(blank=True, max_length=80)),
                ('sex', models.CharField(blank=True, max_length=30)),
                ('size', models.CharField(blank=True, max_length=30)),
                ('description', models.TextField(blank=True)),
                ('image_data_url', models.TextField(blank=True)),
                ('region', models.CharField(max_length=100)),
                ('comuna', models.CharField(max_length=100)),
                ('latitude', models.FloatField(blank=True, null=True)),
                ('longitude', models.FloatField(blank=True, null=True)),
                ('publisher_type', models.CharField(choices=[('persona', 'Persona'), ('albergue', 'Albergue')], default='persona', max_length=20)),
                ('shelter_name', models.CharField(blank=True, max_length=150)),
                ('health_notes', models.TextField(blank=True)),
                ('adoption_status', models.CharField(choices=[('disponible', 'Disponible'), ('reservado', 'Reservado'), ('adoptado', 'Adoptado')], default='disponible', max_length=20)),
                ('contact_name', models.CharField(max_length=120)),
                ('contact_phone', models.CharField(blank=True, max_length=50)),
                ('contact_email', models.EmailField(blank=True, max_length=254)),
                ('publisher_id', models.IntegerField()),
                ('is_confirmed', models.BooleanField(default=False)),
                ('confirmed_at', models.DateTimeField(blank=True, null=True)),
                ('confirmed_by', models.CharField(blank=True, max_length=150)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'indexes': [
                    models.Index(fields=['adoption_status', 'region', 'comuna'], name='gestion_adop_adoptio_7e2f02_idx'),
                    models.Index(fields=['publisher_type', 'species'], name='gestion_adop_publish_55ac31_idx'),
                    models.Index(fields=['created_at'], name='gestion_adop_created_b2d4c9_idx'),
                ],
            },
        ),
    ]
