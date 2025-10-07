# 🚀 Guide d'intégration API Portfolio

## ✨ Votre API est maintenant prête !

Vos compétences et projets sont maintenant accessibles via une API publique que vous pouvez utiliser dans votre portfolio HTML existant.

## 📍 URL de votre API

```
https://mliyjddfantnoniwtruy.supabase.co/functions/v1/portfolio-api
```

## 🔌 Endpoints disponibles

### 1. Récupérer toutes les données
```javascript
fetch('https://mliyjddfantnoniwtruy.supabase.co/functions/v1/portfolio-api')
  .then(response => response.json())
  .then(data => {
    console.log(data.skills);    // Tableau de compétences
    console.log(data.projects);  // Tableau de projets
  });
```

### 2. Récupérer uniquement les compétences
```javascript
fetch('https://mliyjddfantnoniwtruy.supabase.co/functions/v1/portfolio-api?type=skills')
  .then(response => response.json())
  .then(skills => {
    console.log(skills);
  });
```

### 3. Récupérer uniquement les projets
```javascript
fetch('https://mliyjddfantnoniwtruy.supabase.co/functions/v1/portfolio-api?type=projects')
  .then(response => response.json())
  .then(projects => {
    console.log(projects);
  });
```

## 💡 Exemple d'intégration dans votre portfolio HTML

### Option 1 : Afficher les compétences

Ajoutez ce code dans votre fichier HTML existant :

```html
<!-- Section Compétences -->
<section class="skills" id="skills">
    <div class="max-width">
        <h2 class="title">Mes Compétences</h2>
        <div class="skills-content" id="skills-container">
            <!-- Les compétences seront chargées ici -->
        </div>
    </div>
</section>

<script>
// Charger les compétences depuis l'API
fetch('https://mliyjddfantnoniwtruy.supabase.co/functions/v1/portfolio-api?type=skills')
  .then(response => response.json())
  .then(skills => {
    const container = document.getElementById('skills-container');
    container.innerHTML = skills.map(skill => `
      <div class="card">
        <div class="box">
          <div class="text">${skill.name}</div>
          <p>Niveau: ${skill.level}</p>
        </div>
      </div>
    `).join('');
  })
  .catch(error => console.error('Erreur:', error));
</script>
```

### Option 2 : Afficher les projets

```html
<!-- Section Projets -->
<section class="projects" id="projects">
    <div class="max-width">
        <h2 class="title">Mes Projets</h2>
        <div class="proj-content" id="projects-container">
            <!-- Les projets seront chargés ici -->
        </div>
    </div>
</section>

<script>
// Charger les projets depuis l'API
fetch('https://mliyjddfantnoniwtruy.supabase.co/functions/v1/portfolio-api?type=projects')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('projects-container');
    container.innerHTML = projects.map(project => `
      <div class="card">
        <div class="box">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      </div>
    `).join('');
  })
  .catch(error => console.error('Erreur:', error));
</script>
```

## 🎯 Structure des données

### Compétence (Skill)
```json
{
  "id": "uuid",
  "name": "React",
  "level": "Expert",
  "created_at": "2025-10-07T23:16:56.269921+00:00"
}
```

### Projet (Project)
```json
{
  "id": "uuid",
  "title": "Application Web",
  "description": "Description du projet...",
  "created_at": "2025-10-07T23:17:08.270612+00:00"
}
```

## 🔐 Gestion de l'administration

- **Interface d'administration** : https://0b71179f-dcfe-4eed-ba3a-464f43b6d2ba.lovableproject.com
- Connectez-vous avec votre compte pour ajouter/modifier/supprimer des compétences et projets
- Les changements apparaissent **instantanément** sur votre portfolio HTML !

## ✅ Avantages

1. **Mise à jour en temps réel** : Modifiez vos données dans l'interface admin, elles s'affichent automatiquement
2. **Aucun code backend** : L'API est déjà configurée et hébergée
3. **Gratuit** : Hébergé sur Lovable Cloud
4. **Sécurisé** : Les données sont publiques en lecture, mais seul vous pouvez les modifier

## 📝 Notes importantes

- L'API est **publique** : tout le monde peut lire les données (parfait pour un portfolio)
- Seuls les **utilisateurs connectés** peuvent ajouter/modifier/supprimer
- Les données sont stockées de manière sécurisée dans Lovable Cloud

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes, vérifiez :
1. Que l'URL de l'API est correcte
2. Que vous utilisez `fetch` avec les bonnes méthodes
3. Les logs de la console du navigateur pour les erreurs

---

**Astuce** : Consultez le fichier `public/api-example.html` pour un exemple complet et fonctionnel !
