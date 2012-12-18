# Documentation développeur #

## Technologies utilisées par ezPAARSE ##

* [nodejs](http://nodejs.org/) pour le coeur d'ezPAARSE (performances et sa gestion avancée du streaming)
* [git](http://git-scm.com/) pour gérer les bases de connaissances éditeurs et le code source
* [php](http://php.net), [perl](http://www.perl.org/), [python](http://www.python.org/) ou autre langages pour l'écriture des parseurs

## Guide rapide d'utilisation de git ##

Vous êtes développeur et souhaitez contribuer au code source d'ezPAARSE par exemple :
* pour l'écriture de parseur
* ou pour la maintenance d'un parseur existant
* ou même en proposant des améliorations dans le coeur d'ezPAARSE

Tout d'abord, veuillez vous enregistrer sur [Github](https://github.com/).

Vous avez ensuite besoin de maîtriser quelques commandes [git](http://git-scm.com/):

```bash
# récupérer une version du dépôt github en local
git clone https://github.com/ezpaarse-project/ezpaarse.git

# modifier un fichier
cd ezpaarse/
echo "// ma modification" >> ./app.js

# regarder quels sont les fichiers qui on été modifiés/ajoutés/supprimés (avant commit)
git status

# comparer ligne par ligne les modifications locales avec la version du dépôt locale avant modification
git diff

# envoyer la modification dans son dépôt local
git commit ./app.js -m "mon commentaire expliquant ma modification"

# afficher la liste des commits
git log

# ajouter un fichier
touch ./monfichiertest
git add ./monfichiertest
git commit ./monfichiertest -m "ajout d'un fichier test"

# envoyer les modifications (commit) sur le dépôt distant (nécessite une autorisation sur le dépôt distant)
git push
```

Remarque: à moins de disposer d'un accès privilégié (équipe ezPAARSE), vous devez tout d'abord "forker" le dépôt github d'ezPAARSE pour pouvoir ensuite travailler sur cette copie. Une fois que vous êtes satisfaits vous pouvez alors soumettre votre travail à l'équipe ezPAARSE en envoyant une ["pull request"](https://help.github.com/articles/using-pull-requests). Votre travail sera alors relu par l'équipe ezPAARSE puis intégré si aucun souci n'est repéré.

## Écriture d'un parseur ##

TODO expliquer comment procéder pour écrire un parseur :

* un parseur se présente sous la forme d'un fichier executable "parser" accompagné d'un fichier de description [manifest.json](https://github.com/ezpaarse-project/ezpaarse/blob/master/platforms/sd/manifest.json) et du nécessaire pour sa validation (contenu dans un répertoire 'test')
* il accepte en entrée : des [URLs de la plateforme qu'il sait analyser](https://raw.github.com/ezpaarse-project/ezpaarse/master/platforms/sd/test/sd.2012-11-30.url)
* il retourne en sortie : les éléments de consultation reconnus sous forme d'un [flux json](https://github.com/ezpaarse-project/ezpaarse/blob/master/platforms/sd/test/sd.2012-11-30.result.json)
* [exemple en Javascript](https://github.com/ezpaarse-project/ezpaarse/blob/master/platforms/sd/parser)
* [exemple en PHP](https://github.com/ezpaarse-project/ezpaarse/blob/master/platforms/sd/parser.php)
* [exemple en Perl](https://github.com/ezpaarse-project/ezpaarse/blob/master/platforms/sd/parser.pl)