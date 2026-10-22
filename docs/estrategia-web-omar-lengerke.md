# Sitio web oficial · Omar Lengerke
### Documento de estrategia, identidad y contenido (v1.0 para diseño y desarrollo)

> **Cómo leer este documento**
> - `[VERIFICAR]` = dato que el equipo debe confirmar con fuente oficial antes de publicar.
> - `[DATO UTS]` = cifra que debe pedirse a la oficina de planeación/comunicaciones de las UTS (no se inventó ninguna).
> - `[VALIDAR CON EL CANDIDATO]` = posición programática que es un borrador y no consta en los datos entregados.
> - Todo el contenido factual se limita a los datos verificados que entregó el equipo. Nada de lo que sigue atribuye cifras, citas ni notas de prensa que no existan.

---

## 0. Alertas previas (leer antes de diseñar)

1. **Marco legal electoral.** Las normas sobre propaganda electoral, financiación y topes de campaña (Ley 130 de 1994, Ley 1475 de 2011 y reglamentación del CNE) distinguen entre *divulgación política* y *propaganda electoral* según la cercanía a la elección y la inscripción de la candidatura. Mientras no haya inscripción, el copy de este documento evita "vote por", "candidato a la Gobernación" y el logo de partido. **Un abogado electoralista debe revisar el sitio antes del lanzamiento**, y de nuevo cuando se inscriba la candidatura (hay que cambiar el copy del Hero y sumar la información financiera de campaña que exija la norma).
2. **Uso de la gestión en una institución pública.** Los logros UTS son hechos públicos y legítimos de mostrar, pero el sitio no puede usar bienes, marcas, fotos de uso institucional ni canales de las UTS sin autorización. Las fotos deben ser propias o licenciadas; el escudo/logo UTS **no** debe aparecer como respaldo. Se usa el nombre de la institución solo como referencia a su trayectoria.
3. **Habeas data.** Todo formulario (newsletter, voluntariado, contacto) requiere autorización de tratamiento de datos (Ley 1581 de 2012), aviso de privacidad y política publicada.
4. **El linaje con Geo von Lengerke es un arma de doble filo.** Es un recurso de arraigo santandereano (el "Camino de Lengerke", la colonización alemana en Santander), pero la figura histórica es discutida por las acusaciones sobre su trato a los pueblos indígenas del Carare/Opón y los Yariguíes, y por su papel en las concesiones de tierras. Recomendación: **no usarlo como titular**. Mencionarlo una vez, en "Sobre Omar", en tono de herencia de trabajo y espíritu de empresa, sin glorificar al antepasado. Si la prensa lo ataca, el equipo debe tener una respuesta preparada. Además, confirmar la grafía y la genealogía (`Geo von Lengerke` en la bibliografía histórica; el brief dice "Geo Von Heinrich Lengerke") `[VERIFICAR]`.
5. **Sobre el benchmarking (Fase 1).** Se basa en patrones observados en sitios políticos de varios países y en prácticas de UX documentadas. Los ejemplos citados son referencias de patrón y deben revisarse en vivo antes de usarse en presentaciones, porque estos sitios cambian con frecuencia.
6. **Sensibilidad de la salida de la rectoría.** Renunció tras 12 años a la cabeza de una entidad pública. Es previsible que se cuestione la continuidad, la contratación o el uso de la rectoría como plataforma. El sitio debe tener una sección de transparencia sobria (hoja de vida verificable, enlaces a informes de gestión públicos de las UTS) y el equipo, un documento de preguntas difíciles.

---

# FASE 1 · Análisis de identidad, UI/UX y benchmarking

## 1.1 Benchmarking político: qué funciona hoy

### Patrones que se repiten en sitios políticos modernos

| Patrón | Qué hace bien | Riesgo si se hace mal |
|---|---|---|
| **Hero con una sola promesa y un solo CTA** (p. ej. "Súmate") | En 5 segundos el visitante sabe quién es y qué le piden. Las campañas con mejor desempeño reducen opciones en el primer pantallazo. | Hero con tres botones y carrusel: nadie hace nada. |
| **Retrato real, con luz natural y en contexto de trabajo** (no foto de estudio rígida) | Proyecta cercanía y credibilidad. En el perfil técnico es clave mostrarlo *haciendo*: en obra, en laboratorio, en un salón. | Fotos de stock o retoques excesivos destruyen la confianza. |
| **Prueba social concreta**: números con unidad, fecha y fuente | Transparencia. "Obra X: inició en [año], avance [%]" supera a "gran gestión". | Cifras sin fuente = percepción de propaganda. |
| **Línea de tiempo visual** de la trayectoria | Resume décadas en 20 segundos; ideal para perfiles con hoja de vida densa. | Si es solo texto cronológico, aburre. |
| **Propuestas por ejes, con "problema → qué haré → cómo se mide"** | Muestra seriedad. Es la tendencia en candidaturas tecnocráticas. | Listas de 40 promesas sin priorizar. |
| **Mapa interactivo del territorio** (provincias/municipios) | Hace sentir que el candidato "conoce el territorio" y permite personalizar mensajes por región. | Mapas pesados que no cargan en celular. |
| **Prensa y reconocimientos como "muro de confianza"** con logos y enlaces a la fuente | Validación por terceros. | Notas inventadas o sin enlace; hay que linkear siempre a la fuente original. |
| **Mobile-first extremo** | En Colombia más del 70 % del tráfico web es móvil `[VERIFICAR con datos locales]`; WhatsApp es el canal principal de difusión. | Diseñar en desktop y "adaptar" después. |
| **WhatsApp como CTA principal de conversión** (canal de difusión / comunidad) | Es lo que realmente usa el electorado; reemplaza el newsletter en muchas campañas latinoamericanas. | Pedir demasiados datos para registrarse. |
| **Rendimiento y accesibilidad visibles** (carga rápida, contraste, subtítulos en video) | La confiabilidad se percibe en la velocidad. | Videos de fondo pesados en 4G. |

### Qué funciona para cada atributo

**Liderazgo**
- Tipografía serif sobria en titulares, con mucho espacio en blanco.
- Un verbo de acción grande en el Hero.
- Fotografía en contrapicado suave o a nivel de ojos, nunca desde arriba.
- Credenciales *verificables* (acreditación, órdenes, centros fundados) en vez de adjetivos.

**Transparencia**
- Sección fija "Hoja de vida y declaración verificable": enlaces a fuentes oficiales.
- Cada cifra lleva nota: *"Fuente: Informe de gestión UTS 2024, p. X"*.
- Fecha de última actualización visible en cada sección.
- Política de financiación y contacto de prensa visibles, no escondidos en el footer.

**Cercanía**
- Lenguaje en primera persona, frases cortas, léxico regional (con mesura).
- Mostrar a *otras personas* (egresados, estudiantes, mujeres emprendedoras, maestros) más que al candidato.
- Testimonios en video corto vertical (9:16), subtitulados.
- Canales de escucha: formulario "Cuéntame tu propuesta para tu municipio".

### Anti-patrones a evitar
- Banderas, escudos y símbolos patrios como decoración (riesgo legal y estético).
- Colores de partidos tradicionales dominando el diseño (ver paleta).
- Contadores de "días para las elecciones" antes de tiempo.
- Carruseles automáticos, pop-ups de entrada y autoplay con sonido.
- Cifras redondas sin fuente.

---

## 1.2 Identidad de marca

### Diagnóstico del talante
| Dimensión | Lectura | Implicación en la web |
|---|---|---|
| Perfil académico | Doctor en Ciencias en Ing. Mecánica (UFRJ), posdoctor en robótica, Investigador Senior MinCiencias | Autoridad técnica; riesgo de **sonar distante o "profesoral"** |
| Perfil de resultados | Acreditación de alta calidad, nuevas sedes, seccionales, centros | Narrativa de **"obra que se ve"** |
| Raíces | Socorro, linaje histórico, Santander profundo | Tono **orgulloso y directo**, no solemne |
| Experiencia en gobierno | Creó la Secretaría TIC de la Gobernación (2012-2015) | Credencial de **gestor público** antes de la academia |
| Fase política | Recién salido de la rectoría, aún sin partido visible | **Marca personal propia**, sin depender de siglas |

**Tensión central a resolver:** *"técnico y excelente" ↔ "cercano y santandereano".* La web debe traducir lo sofisticado en lo cotidiano: *"doctor en robótica"* → *"un santandereano que estudió lo más avanzado para traer ese conocimiento a la tierra"*.

### Posicionamiento propuesto (borrador)
> **El que construye.** Un santandereano que convirtió el conocimiento en obra, y la obra en oportunidades para su gente.

Pilares: **Conocimiento con obra · Territorio completo · Resultados medibles.**

### Paleta de color

Criterios: diferenciarse de los colores de partidos tradicionales, transmitir confianza + tecnología + tierra, cumplir **contraste WCAG AA** (mínimo 4.5:1 en texto).

| Rol | Nombre | HEX | Uso |
|---|---|---|---|
| Primario | **Azul Chicamocha** (azul profundo) | `#0F2B46` | Fondos oscuros, titulares, footer |
| Acento principal | **Cobre Barichara** (terracota/cobre) | `#C2602F` | Botones CTA, subrayados, datos clave |
| Acento secundario | **Verde Guadua** | `#2F7D5B` | Ambiente (CEDERA), estados positivos |
| Base clara | **Crema Piedra** | `#F7F2EA` | Fondo general (cálido, menos frío que blanco puro) |
| Neutro oscuro | **Grafito** | `#1E252B` | Texto de cuerpo |
| Neutro medio | **Arena** | `#D9CFC0` | Divisores, tarjetas |
| Resalte tecnológico | **Cian Datos** | `#2BB3C0` | Detalles en gráficos y línea de tiempo (uso mínimo) |

Notas:
- El **cobre** da calidez santandereana (piedra, tierra, tabaco, barro) y evita el rojo/azul puro de los partidos.
- Validar contrastes: texto Grafito sobre Crema ≈ 13:1 ✔; blanco sobre Azul Chicamocha ≈ 14:1 ✔; **blanco sobre Cobre** es ≈ 4.0:1, **insuficiente para texto pequeño**: usar texto Azul Chicamocha sobre botón cobre, o aumentar a 18 px bold `[VERIFICAR con herramienta de contraste]`.
- Modo oscuro opcional (fondo Azul Chicamocha, texto Crema).

### Tipografías
| Uso | Fuente (Google Fonts, licencia libre) | Por qué |
|---|---|---|
| Titulares | **Fraunces** (serif con carácter) o alternativa **Source Serif 4** | Autoridad académica con calidez; evita el aspecto corporativo frío. |
| Cuerpo y UI | **Inter** o **Public Sans** | Legibilidad en móvil, muy buen soporte de tildes y ñ. |
| Cifras destacadas | **Space Grotesk** o **IBM Plex Mono** | Apunta a lo técnico/dato sin sentirse "ciencia ficción". |

Escala tipográfica móvil/desktop: H1 40/64 px · H2 28/40 · H3 22/28 · cuerpo 17–18 px, interlineado 1.6.

### Tono de comunicación
**Fórmula: "el ingeniero que habla como un vecino".**

| Sí | No |
|---|---|
| Frases cortas, verbos de acción: *construimos, abrimos, llevamos* | Jerga académica: *ecosistemas de innovación sinérgicos* |
| "Hablemos claro" (franqueza santandereana) | Grandilocuencia, "destino histórico", culto a la personalidad |
| Cifras con fuente | Adjetivos sin prueba |
| Reconocer a los equipos ("lo hicimos con…") | Yo-yo-yo constante |
| Humor leve y sobrio en redes | Burlas o ataques a rivales |
| Nombrar municipios y provincias | Generalidades sobre "las regiones" |

Palabras ancla: **obra, conocimiento, oportunidad, territorio, resultados, cumplir.**
Palabras a usar con cuidado: *revolución, cambio radical, salvador, el único.*

---

# FASE 2 · Estructura y contenido

## 2.0 Mapa del sitio

```
/                       Home
/sobre-omar             Sobre Omar (trayectoria + formación)
/logros-uts             Logros UTS (2015-2026)
/propuestas             Visión / Propuestas
/prensa                 Sala de Prensa (noticias y reconocimientos, kit de medios)
/transparencia          Hoja de vida verificable, fuentes, política de datos
/unete                  Voluntariado / comunidad de WhatsApp / contacto
```

Navegación: `Inicio · Sobre Omar · Logros UTS · Propuestas · Prensa · [Súmate]` (botón cobre, fijo en móvil).

Footer: redes, enlace a Transparencia, política de privacidad, aviso de responsabilidad legal de la propaganda `[según asesoría electoral]`.

---

## 2.1 HOME

### Bloque 1 · Hero
**Layout:** foto a sangre derecha (retrato de Omar en contexto de obra o aula), texto a la izquierda sobre Crema; en móvil, foto arriba y texto debajo. Sin carrusel. Un CTA primario + un enlace secundario.

**Eyebrow:** `OMAR LENGERKE · INGENIERO · DOCTOR · SANTANDEREANO`

**Titular (opción A, recomendada):**
> # El conocimiento tiene que convertirse en obra.

**Titular (opción B):**
> # Santander sabe hacer. Falta que le dejen hacer más.

**Titular (opción C):**
> # Doce años construyendo futuro desde Santander.

**Subtítulo:**
> Pasé casi doce años al frente de las UTS convirtiendo la educación en sedes, centros y oportunidades para miles de familias santandereanas. Ahora quiero poner esa misma capacidad de ejecución al servicio de todo el departamento.

*(Nota legal: con la inscripción de la candidatura se reemplaza la última frase por la formulación electoral aprobada por el asesor.)*

**CTA primario:** `Súmate a la conversación`  →  `/unete`
**CTA secundario (texto):** `Conoce lo que hemos construido →`  →  `/logros-uts`

**Banda de credenciales (bajo el Hero, 4 cifras/etiquetas):**
| 2015–2026 | Alta calidad | 4 centros | 3 ciudades y más |
|---|---|---|---|
| Rector de las UTS | Institución acreditada | CEDERA · LCC · CIP · CAFE | Bucaramanga · Barrancabermeja · Piedecuesta · Vélez |

---

### Bloque 2 · Presentación en 30 segundos
**Titular:** `Del Socorro al mundo. Del mundo, de vuelta a Santander.`

**Copy:**
> Nací en El Socorro, Santander. Estudié ingeniería de sistemas, hice una maestría en ciencias de la información y un doctorado en ingeniería mecánica en la Universidad Federal de Río de Janeiro. Después me especialicé en robótica y diseño de máquinas mecatrónicas.
>
> Pude haberme quedado afuera. Volví, porque la mejor forma de usar lo que uno aprende es ponerlo a trabajar donde nació.

**Enlace:** `Leer mi historia →` `/sobre-omar`

---

### Bloque 3 · "Lo que hemos construido" (vista previa de Logros)
Tarjetas de 4 columnas (carrusel solo en móvil, con gestos manuales):

1. **Educación de alta calidad.** Las UTS lograron su acreditación institucional de alta calidad.
2. **Educación más cerca.** Nuevas sedes y seccionales en Barrancabermeja, Piedecuesta y Vélez.
3. **Ciencia para el territorio.** Centros que resuelven problemas reales: ambiente, cultura ciudadana, productividad y emprendimiento.
4. **Gestión pública.** Creador de la primera Secretaría TIC de la Gobernación de Santander. `[VERIFICAR si fue "primera"; si no, decir "creador y titular"]`

**CTA:** `Ver todos los logros →`

---

### Bloque 4 · Trayectoria en una línea de tiempo (mini)
Ver detalle en `/sobre-omar`. En el Home: línea horizontal con 5 hitos clickeables:
`Formación · Secretaría TIC (2012-2015) · Rector UTS (2015-2026) · Reconocimientos · Hoy`

---

### Bloque 5 · Reconocimientos (carrusel de sellos, sin autoplay)
`Orden Juan Manuel Ortiz · Orden Ciudadanía de Vélez · Orden Ciudad de Bucaramanga · Galardón Orquídea de Oro · Colegio Nacional de Periodistas de Santander`
**Enlace:** `Ver reconocimientos →` `/prensa`

---

### Bloque 6 · Propuestas (teaser)
**Titular:** `Una Santander que trabaja con conocimiento`
**Copy:**
> Estamos construyendo, con la gente, un plan para todo el departamento. Empieza por escucharte.

**CTA:** `Dime qué necesita tu municipio →` (formulario corto: municipio + tema + mensaje).

---

### Bloque 7 · Cierre / Súmate
**Titular:** `Esto se hace entre todos`
**Copy:** `Únete a la comunidad de WhatsApp y recibe, sin ruido, lo que vamos haciendo.`
**Formulario:** nombre, municipio, celular (opcional email) + casilla de autorización de datos.
**Botones:** `Unirme por WhatsApp` · `Ser voluntario`

---

## 2.2 SOBRE OMAR

### Hero interno
**Eyebrow:** `SOBRE OMAR`
**Titular:**
> # Un santandereano que estudió lo más avanzado para ponerlo al servicio de su tierra.

### Sección A · Historia personal
**Titular:** `Raíces`
**Copy:**
> Nací en El Socorro, Santander, cuna de los comuneros, tierra de gente brava y trabajadora. Llevo en la sangre el espíritu de los que no esperan a que otro resuelva: se arremangan y construyen.
>
> Mi apellido viene de lejos. Un antepasado, Geo von Lengerke, llegó desde Alemania en el siglo XIX y abrió caminos en estas montañas. Su historia, con luces y sombras, me recuerda que Santander siempre ha sido tierra de gente que abre rutas, y que cada generación debe hacerlo mejor que la anterior, con respeto por todos los que habitan el territorio.

*(Texto sobre el antepasado `[VALIDAR CON EL CANDIDATO]` y con historiador; ver Alerta 4.)*

### Sección B · Línea de tiempo interactiva (módulo estrella)

**Interacción:** línea vertical en móvil, horizontal en desktop; al seleccionar un hito se despliega tarjeta con foto/ícono, año y texto. Doble carril: **"Formación" (azul)** y **"Servicio público" (cobre)**.

| Año | Carril | Hito | Microcopy |
|---|---|---|---|
| `[VERIFICAR año]` | Formación | **Ingeniero de Sistemas** | "Aprendí a ordenar la complejidad." |
| `[VERIFICAR año]` | Formación | **Magíster en Ciencias de la Información** | "Entendí que los datos sirven si ayudan a decidir mejor." |
| `[VERIFICAR años]` | Formación | **Doctorado en Ciencias en Ingeniería Mecánica**, Universidad Federal de Río de Janeiro | "Cuatro años [VERIFICAR] en Brasil aprendiendo a resolver problemas difíciles." |
| `[VERIFICAR año]` | Formación | **Posdoctorado en Robótica y Diseño de Máquinas Mecatrónicas** | "Del conocimiento a la tecnología aplicada." |
| `[VERIFICAR]` | Reconocimiento científico | **Investigador Senior MinCiencias** | "Reconocido por su producción científica." |
| 2012–2015 | Servicio público | **Creador y titular de la Secretaría de las TIC, Gobernación de Santander** | "Puse a la tecnología a trabajar para la gente desde el gobierno departamental." |
| 2015 | Servicio público | **Asume la rectoría de las UTS** | "Empieza un proyecto de institución abierta al territorio." |
| 2018 | Reconocimiento | Orden Juan Manuel Ortiz del Socorro; Orden Ciudadanía de Vélez | "Reconocimientos de mi pueblo y de Vélez." |
| 2021 | Reconocimiento | Orden "Ciudad de Bucaramanga" | |
| 2022 | Reconocimiento | Galardón Orquídea de Oro | |
| 2024 | Reconocimiento | Colegio Nacional de Periodistas de Santander, por su impacto educativo | |
| 2026 | Hoy | **Concluye su gestión como rector de las UTS (2015-2026)** | "Tras casi doce años, entrego una institución más grande, acreditada y más cercana al territorio." `[VERIFICAR fecha exacta de la renuncia y formulación]` |

### Sección C · Formación académica (tarjetas con íconos)
- 🎓 **Ingeniería de Sistemas**
- 📊 **Maestría en Ciencias de la Información**
- 🤖 **Doctorado en Ciencias en Ingeniería Mecánica** · Universidad Federal de Río de Janeiro
- 🔧 **Posdoctorado en Robótica y Diseño de Máquinas Mecatrónicas**
- 🔬 **Investigador Senior · MinCiencias**

*(Instituciones de pregrado, maestría y posdoctorado, `[VERIFICAR]`, con enlaces a verificación como CvLAC/MinCiencias.)*

### Sección D · Cómo trabajo (valores)
Tres columnas, copy breve:
1. **Primero escucho, luego mido, después construyo.**
2. **Los resultados se muestran.** Si no se puede medir, no es un resultado.
3. **Se hace con equipo.** Detrás de cada obra hay cientos de manos.

### Cierre
**CTA:** `Conoce lo que hemos construido →`

---

## 2.3 LOGROS UTS (2015–2026)

### Hero interno
**Titular:**
> # Doce años de la educación a la obra.

**Subtítulo:**
> De una institución a una red de sedes, centros y oportunidades para el territorio. Esto es lo que se construyó entre 2015 y 2026.

### Módulo 1 · "Del dato al beneficio" (estructura obligatoria de cada logro)

Cada logro se presenta en tarjeta con 4 líneas fijas: **Qué se hizo → Qué significa para la gente → Dato verificable → Fuente.**

#### Logro 1 · Acreditación institucional de alta calidad
- **Qué se hizo:** las UTS obtuvieron la acreditación institucional de alta calidad.
- **Qué significa para la gente:** *"Un joven de Santander puede estudiar en una institución pública cuya calidad está certificada por el Estado, sin tener que irse de su departamento."*
- **Dato:** `[DATO UTS: resolución de acreditación, año, vigencia en años]`
- **Fuente:** `[Resolución Mineducación / CNA — enlace]`

#### Logro 2 · Ampliación de la sede de Bucaramanga
- **Qué se hizo:** ampliación de la infraestructura de la sede principal.
- **Para la gente:** *"Más cupos, mejores aulas y laboratorios para quienes ya estudian aquí, y más oportunidades para quienes esperaban entrar."*
- **Dato:** `[DATO UTS: m² construidos, inversión, cupos nuevos]`

#### Logro 3 · Sede de Barrancabermeja (en construcción)
- **Qué se hizo:** se inició la construcción de una sede moderna en Barrancabermeja.
- **Para la gente:** *"La educación superior pública llega a la capital petrolera de Colombia: jóvenes del Magdalena Medio estudiando en casa, sin desplazarse ni asumir costos de vivienda en otra ciudad."*
- **Dato:** `[DATO UTS: estado de avance, inversión, capacidad]` — **Presentar con honestidad: "se inició la construcción", no "se inauguró"**, salvo que el dato cambie.

#### Logro 4 · Seccionales de Piedecuesta y Vélez
- **Qué se hizo:** creación de dos seccionales.
- **Para la gente:** *"En Vélez y Piedecuesta, estudiar una carrera ya no implica mudarse a la capital. Cada familia ahorra, y cada municipio retiene a su talento."*
- **Dato:** `[DATO UTS: estudiantes matriculados por seccional]`

#### Logro 5 · Cuatro centros que resuelven problemas reales
| Centro | Qué hace (traducción social) | Dato `[DATO UTS]` |
|---|---|---|
| **CEDERA** · Centro para el Desarrollo de los Recursos Ambientales | Investigación y proyectos para cuidar el agua, el suelo y los recursos naturales de Santander. | proyectos, municipios beneficiados |
| **LCC** · Laboratorio de Cultura Ciudadana | Cambios de conducta en la ciudadanía: convivencia, respeto por lo público y corresponsabilidad. | programas, personas alcanzadas |
| **CIP** · Centro de Innovación y Productividad | Apoyo a empresas del departamento para producir más y mejor con tecnología. | empresas atendidas |
| **CAFE** · Centro Académico para el Fomento del Emprendimiento | Acompañamiento a emprendedores para que sus ideas se vuelvan negocios. | emprendimientos acompañados |

*(Descripciones funcionales sujetas a confirmación con cada centro, `[VERIFICAR]`.)*

### Módulo 2 · Mapa de presencia
Mapa de Santander con 4 pines: **Bucaramanga · Barrancabermeja · Piedecuesta · Vélez**. Al pasar el cursor/tocar: foto + dato + enlace a la fuente.

### Módulo 3 · Contador "Resultados en cifras" (solo con datos reales)
Cuatro cifras grandes (animación discreta, accesible, con `prefers-reduced-motion`):
`[N] estudiantes` · `[N] graduados` · `[N] m² construidos` · `[N] proyectos de investigación` — todas `[DATO UTS]`, con la nota *"Fuente y fecha de corte"*.
Si no hay dato verificable, **la cifra no se publica**.

### Módulo 4 · Voces
3 testimonios en video corto o cita escrita de estudiantes, egresados y empresarios, con nombre, municipio y consentimiento firmado `[DATO UTS / Producción]`.

### Cierre
> **Lo que hicimos en las UTS es la prueba de lo que sabemos hacer.**
> `Ver propuestas →`

---

## 2.4 VISIÓN / PROPUESTAS

> ⚠️ **Los datos entregados no incluyen el programa de gobierno.** Los ejes siguientes son un **borrador derivado de la trayectoria** y deben ser validados, ajustados o descartados por el candidato y su equipo programático. No se presenta ninguna cifra meta inventada.

### Hero interno
**Titular:**
> # Un plan para todo Santander, construido con Santander.

**Subtítulo:**
> Seis ejes, un método: escuchar, medir y cumplir.

### Método (3 pasos)
1. **Escuchamos** en cada provincia.
2. **Medimos** con datos abiertos y metas públicas.
3. **Cumplimos y rendimos cuentas**, con tablero público de avance.

### Ejes propuestos (borrador)

| # | Eje | Idea fuerza | Problema → Qué haríamos → Cómo se mide |
|---|---|---|---|
| 1 | **Educación y talento santandereano** | "Que ningún joven tenga que irse de su tierra para estudiar o trabajar." | Brecha de acceso → ampliar oferta técnica, tecnológica y universitaria en las provincias y conectarla con las empresas → cupos nuevos, empleabilidad de egresados `[VALIDAR]` |
| 2 | **Santander digital** | "Tecnología al servicio de la gente, empezando por el Estado." | Trámites lentos y brecha digital → gobierno digital y conectividad (parte de la experiencia en la Secretaría TIC) → trámites en línea, municipios conectados `[VALIDAR]` |
| 3 | **Ciencia, innovación y empleo** | "Producir más y mejor, con conocimiento." | Pocas empresas innovadoras → alianza universidad–empresa–gobierno (modelo CIP/CAFE) → empleos formales, empresas atendidas `[VALIDAR]` |
| 4 | **Ambiente y agua** | "Cuidar el agua es cuidar el futuro de la economía santandereana." | Presión sobre recursos naturales → investigación aplicada y proyectos de conservación (modelo CEDERA) → indicadores de calidad hídrica `[VALIDAR]` |
| 5 | **Territorio completo** | "Santander no es solo el área metropolitana." | Desigualdad entre provincias → presencia institucional en todo el departamento (modelo seccionales) → inversión por provincia `[VALIDAR]` |
| 6 | **Cultura ciudadana y gobierno abierto** | "Lo público se cuida entre todos y se cuenta con claridad." | Desconfianza → datos abiertos, rendición de cuentas, cultura ciudadana (modelo LCC) → tablero público de metas `[VALIDAR]` |

**Presentación UI:** 6 tarjetas expansibles; cada una abre un panel "Problema / Propuesta / Meta". Sin PDF de 80 páginas como único formato; se ofrece como descarga opcional.

### Participación
**Módulo:** `Propón tu idea` (formulario: municipio, eje, texto de hasta 500 caracteres). Las 5 propuestas con más apoyo se responden públicamente cada mes.

### Cierre
> **Este plan se escribe con ustedes.** `Ser parte →`

---

## 2.5 SALA DE PRENSA

### Hero interno
**Titular:**
> # Lo que dicen de la gestión. Con nombre y fuente.

**Subtítulo:** `Reconocimientos oficiales, notas de prensa y material para medios.`

### Módulo "Noticias y Reconocimientos" (especificación)

**Estructura de la página:**
1. **Reconocimientos destacados** (línea de tiempo horizontal)
2. **Notas de prensa** (listado filtrable)
3. **Comunicados** del equipo
4. **Kit de medios**

#### 1 · Reconocimientos (contenido verificado)
| Año | Reconocimiento | Otorgante | Texto de tarjeta |
|---|---|---|---|
| 2018 | **Orden Juan Manuel Ortiz** | Municipio de El Socorro | "Su pueblo natal lo condecoró por su trayectoria." |
| 2018 | **Orden Ciudadanía de Vélez** | Municipio de Vélez | "Vélez lo reconoció por llevar la educación superior a la provincia." |
| 2021 | **Orden "Ciudad de Bucaramanga"** | Ciudad de Bucaramanga | "La capital de Santander reconoció su aporte a la ciudad." |
| 2022 | **Galardón Orquídea de Oro** | `[VERIFICAR entidad otorgante]` | |
| 2024 | **Condecoración del Colegio Nacional de Periodistas, seccional Santander** | Colegio Nacional de Periodistas de Santander | "Los periodistas de Santander destacaron su impacto educativo." |

*(Las frases de impacto entre comillas son copy propuesto; verificar con el acto/decreto/acuerdo de cada condecoración y el otorgante. Cada tarjeta debe enlazar al documento o nota que lo respalde. Un reconocimiento sin soporte documental no se publica.)*

#### 2 · Notas de prensa (listado)
**Contenido y reglas:**
- El equipo de prensa **recopila y enlaza** notas reales de medios (Vanguardia, medios regionales, emisoras, canales). **No se copian textos completos**: se muestra titular, medio, fecha, un resumen propio de máximo 2 líneas y botón `Leer en [medio] →`.
- Cada nota con etiqueta: `Gestión UTS · Reconocimiento · Entrevista · Opinión`.
- Filtros por año y tema. Orden cronológico inverso.

**Plantilla de tarjeta:**
```
[Logo medio]  FECHA  ·  TEMA
Titular de la nota (textual, del medio)
Resumen propio de 2 líneas.
Leer en [Medio] →
```
Placeholder para las primeras entradas: `[RECOPILAR: 6–10 notas reales, 2018–2026, con URL]`. **No publicar la sección vacía**; si hay menos de 3, mostrar solo reconocimientos.

#### 3 · Comunicados
Plantilla: fecha, titular, 3 párrafos, contacto de prensa. Se publica en `/prensa/[slug]`.

#### 4 · Kit de medios
- Biografía corta (100 palabras) y larga (400 palabras)
- 5 fotos en alta resolución con crédito y licencia
- Logo y guía de uso
- Contacto de prensa `[nombre, correo, teléfono]`

**Biografía corta (para el kit, 100 palabras):**
> Omar Lengerke es ingeniero de sistemas, magíster en Ciencias de la Información, doctor en Ciencias en Ingeniería Mecánica por la Universidad Federal de Río de Janeiro, con posdoctorado en Robótica y Diseño de Máquinas Mecatrónicas, e Investigador Senior de MinCiencias. Nacido en El Socorro, Santander, fue el primer titular de la Secretaría de las TIC de la Gobernación de Santander (2012-2015) y rector de las Unidades Tecnológicas de Santander entre 2015 y 2026, periodo en el que la institución obtuvo la acreditación de alta calidad, amplió su sede en Bucaramanga, inició la construcción de su sede en Barrancabermeja y creó las seccionales de Piedecuesta y Vélez. `[VERIFICAR "primer titular"]`

---

## 2.6 TRANSPARENCIA (página corta, recomendada)

**Titular:** `Todo lo que digo, se puede verificar.`

Contenido:
- Hoja de vida con enlaces a fuentes oficiales (CvLAC/MinCiencias, resoluciones de acreditación, informes de gestión UTS).
- Fecha de última actualización del sitio.
- Política de tratamiento de datos y aviso de privacidad.
- Canal de correcciones: *"¿Encontró un error? Escríbanos a [correo] y corregimos en 48 horas."*
- `[Según asesoría electoral]` datos de financiación y responsables del sitio.

---

## 2.7 /UNETE

**Titular:** `Suma tu voz. Suma tu municipio.` *(en Santander domina el "usted"/"tú"; evitar voseo)*

Opciones (tarjetas):
1. **Comunidad de WhatsApp** (CTA principal)
2. **Voluntariado** (formulario: nombre, municipio, disponibilidad, habilidades)
3. **Propón una idea**
4. **Contacto de prensa**

Formulario: máximo 4 campos, autorización de datos, confirmación con mensaje claro de qué recibirá la persona y con qué frecuencia.

---

## 2.8 Microcopy global

| Elemento | Texto |
|---|---|
| Botón principal | `Súmate` |
| Botón secundario | `Conoce más →` |
| Éxito de formulario | `Listo. Ya haces parte de esta comunidad. Te escribiremos pronto.` |
| Error de formulario | `Algo salió mal. Intenta de nuevo o escríbenos a [correo].` |
| 404 | `Esta ruta no existe. Pero hay mucho por construir. Volver al inicio →` |
| Footer | `© 2026 Omar Lengerke. Sitio en construcción colaborativa.` |

---

# FASE 3 (anexo) · Especificaciones para diseño y desarrollo

## 3.1 Diseño
- Grid de 12 columnas desktop, 4 en móvil; márgenes de 16 px en móvil.
- Breakpoints: 360 · 768 · 1024 · 1280 · 1536.
- Botones: alto mínimo 48 px, radio 8 px, estados hover/focus/disabled visibles.
- Foco visible en todos los elementos interactivos. Navegación 100 % por teclado.
- Animaciones: duración 200–400 ms, respetar `prefers-reduced-motion`.
- Imágenes: formato AVIF/WebP, `alt` descriptivo, relación 4:5 en móvil y 16:9 en desktop.
- Video: sin autoplay con sonido; subtítulos obligatorios.

## 3.2 Desarrollo (proyecto ya creado con Next.js)
> `AGENTS.md` del repositorio advierte que esta versión de Next.js tiene cambios respecto a versiones anteriores: **antes de programar, leer la guía correspondiente en `node_modules/next/dist/docs/`**.

| Tema | Decisión propuesta |
|---|---|
| Framework | Next.js (App Router) + TypeScript + Tailwind (ya instalados) |
| Rutas | `/`, `/sobre-omar`, `/logros-uts`, `/propuestas`, `/prensa`, `/prensa/[slug]`, `/transparencia`, `/unete` |
| Contenido | MDX o CMS headless (Sanity/Contentful/Strapi) para notas, reconocimientos y logros; así el equipo de prensa publica sin tocar código |
| Componentes clave | `Hero`, `CredentialBar`, `Timeline`, `AchievementCard`, `CenterCard`, `TerritoryMap`, `StatCounter`, `PressCard`, `AwardCard`, `ProposalAccordion`, `LeadForm`, `Footer` |
| Formularios | Server Actions o API Route → base de datos (Supabase/Postgres) con campo de consentimiento y fecha; protección anti-spam (Turnstile/hCaptcha) |
| SEO | Metadatos por página, Open Graph con imagen de marca, `sitemap.xml`, `robots.txt`, datos estructurados `Person` y `NewsArticle` |
| Rendimiento | Meta: LCP < 2.5 s en 4G, CLS < 0.1, Lighthouse ≥ 90; `next/image`, fuentes con `next/font` |
| Accesibilidad | WCAG 2.2 AA; pruebas con lector de pantalla y revisión automática (axe) |
| Analítica | Herramienta respetuosa de la privacidad (Plausible/Umami); eventos: clic en WhatsApp, envío de formulario, descarga de kit de medios |
| Seguridad | HTTPS, cabeceras de seguridad, sin almacenar datos sensibles innecesarios, copias de seguridad |
| Hosting | Vercel o equivalente con dominio propio `[definir dominio]` |
| i18n | Español (Colombia). No se prevé versión en inglés en v1 |

## 3.3 Tokens de diseño (punto de partida para Tailwind)
```css
:root {
  --azul-chicamocha: #0F2B46;
  --cobre-barichara: #C2602F;
  --verde-guadua:    #2F7D5B;
  --crema-piedra:    #F7F2EA;
  --grafito:         #1E252B;
  --arena:           #D9CFC0;
  --cian-datos:      #2BB3C0;
}
```

## 3.4 Lista de insumos pendientes (bloquean el lanzamiento)
- [ ] Fotografías propias (retrato, trabajo en obra, aula, seccionales) con cesión de derechos
- [ ] Cifras oficiales UTS con fuente y fecha de corte
- [ ] Resolución de acreditación (fecha y vigencia)
- [ ] Entidad otorgante del Galardón Orquídea de Oro y soportes de las condecoraciones
- [ ] 6–10 notas de prensa reales con URL
- [ ] Años y universidades de cada título
- [ ] Texto final del programa de gobierno (ejes de §2.4)
- [ ] Revisión del abogado electoralista
- [ ] Decisión sobre uso del linaje Lengerke (§0.4)
- [ ] Dominio, correo de prensa y número de WhatsApp de la comunidad

## 3.5 Preguntas difíciles que el equipo debe tener respondidas
1. ¿Por qué 12 años en la rectoría y por qué salir ahora?
2. ¿Hubo uso de recursos o infraestructura de las UTS con fines políticos? (Respuesta con evidencia.)
3. ¿Qué pasa con la obra de Barrancabermeja y cuándo se entrega?
4. ¿Con qué sectores o partidos tendrá alianzas?
5. ¿Cómo responde frente a las críticas a su antepasado Geo von Lengerke?
6. ¿Qué haría distinto a la gestión actual de la Gobernación?
