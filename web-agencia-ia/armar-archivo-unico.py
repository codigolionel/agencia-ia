# -*- coding: utf-8 -*-
"""Arma agencia-ia.html: un solo archivo con el CSS, los datos y el JS adentro.

Motivo: si el HTML se abre desde una vista previa o desde otra carpeta, las rutas
relativas (assets/...) no resuelven y la página queda sin estilos. Con todo inline
no depende de nada local (los CDN de Tailwind, fuentes e iconos son opcionales).
"""
import io
import os

BASE = os.path.join(".", "web-agencia-ia")
SALIDA = "agencia-ia.html"

html = io.open(os.path.join(BASE, "index.html"), encoding="utf-8").read()
css = io.open(os.path.join(BASE, "assets", "styles.css"), encoding="utf-8").read()
data = io.open(os.path.join(BASE, "assets", "data.js"), encoding="utf-8").read()
app = io.open(os.path.join(BASE, "assets", "app.js"), encoding="utf-8").read()

for etiqueta, texto in (("</style", css), ("</script", data), ("</script", app)):
    if etiqueta.lower() in texto.lower():
        raise SystemExit("El contenido de %s rompe el inlineado" % etiqueta)

html = html.replace(
    '<link rel="stylesheet" href="assets/styles.css">',
    "<style>\n" + css + "\n</style>",
)
html = html.replace(
    '<script src="assets/data.js"></script>',
    "<script>\n" + data + "\n</script>",
)
html = html.replace(
    '<script src="assets/app.js"></script>',
    "<script>\n" + app + "\n</script>",
)

if "assets/" in html:
    raise SystemExit("Quedaron rutas relativas a assets/ en el HTML")

io.open(SALIDA, "w", encoding="utf-8").write(html)
print("escrito:", SALIDA, "%.1f KB" % (os.path.getsize(SALIDA) / 1024))
print("hojas de estilo externas:", html.count('rel="stylesheet" href="assets'))
print("scripts externos locales:", html.count('src="assets'))
