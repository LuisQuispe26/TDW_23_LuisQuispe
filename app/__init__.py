from flask import Blueprint, render_template

main = Blueprint("main", __name__)


@main.route("/")
def inicio():

    imagenes = [
        {
            "archivo": "imagen01.jpg",
            "titulo": "Imagen 1",
            "descripcion": "Primera imagen"
        },
        {
            "archivo": "imagen02.jpg",
            "titulo": "Imagen 2",
            "descripcion": "Segunda imagen"
        },
        {
            "archivo": "imagen03.jpg",
            "titulo": "Imagen 3",
            "descripcion": "Tercera imagen"
        },
        {
            "archivo": "imagen04.jpg",
            "titulo": "Imagen 4",
            "descripcion": "Cuarta imagen"
        },
        {
            "archivo": "imagen05.jpg",
            "titulo": "Imagen 5",
            "descripcion": "Quinta imagen"
        },
        {
            "archivo": "imagen06.jpg",
            "titulo": "Imagen 6",
            "descripcion": "Sexta imagen"
        },
        {
            "archivo": "imagen07.jpg",
            "titulo": "Imagen 7",
            "descripcion": "Séptima imagen"
        },
        {
            "archivo": "imagen08.jpg",
            "titulo": "Imagen 8",
            "descripcion": "Octava imagen"
        }
    ]

    return render_template(
        "carrusel_slider/base.html",
        imagenes=imagenes
    )