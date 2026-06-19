const serviceCatalogTranslations = {
  ca: {
    photovoltaic: {
      summary: "Conèixer el servei d’energia",
      kicker: "Inspecció fotovoltaica amb dron",
      heading: "Diagnosi tècnica per prioritzar el manteniment",
      intro: "Inspeccionem plantes solars amb sensors tèrmics i RGB per detectar incidències, conèixer l’estat real dels actius i convertir la captura aèria en informació traçable per a operació i manteniment.",
      areas: [
        ["Termografia de mòduls", "Localització d’anomalies tèrmiques associades a pèrdues de rendiment.", "Punts calents i patrons anòmals;Mòduls, strings i connexions;Classificació i prioritat d’incidències"],
        ["Inspecció visual RGB", "Documentació d’alta resolució per avaluar danys visibles i el seu context.", "Trencaments, brutícia i ombres;Vegetació, tancaments i accessos;Evidències fotogràfiques georeferenciades"],
        ["Cartografia de planta", "Visió contínua de l’emplaçament per a inventari, obra civil i seguiment.", "Ortofoto tècnica i inventari;Drenatges, camins i erosió;Comparació entre campanyes"],
        ["Dades per a manteniment", "Resultats preparats per integrar-se en els processos del client.", "Mapes i fitxes d’incidències;Capes GIS i taules estructurades;Integració amb GMAO i sistemes interns"]
      ],
      process: ["Com treballem", "De la planificació a l’informe tècnic", "L’abast s’adapta a la mida de la planta i a l’objectiu de manteniment.", "Planificació: viabilitat UAS, abast, seguretat i pla de vol.;Captura: vols tèrmics i RGB amb control de qualitat en camp.;Lliurament: anàlisi, incidències georeferenciades i integració de dades."],
      columns: [
        ["Aplicacions", "Diagnosi de mòduls i strings;Control de vegetació i brutícia;Revisió de drenatges i obra civil;Seguiment periòdic d’actius"],
        ["Modalitats", "Inspecció tèrmica bàsica;Inspecció RGB i tèrmica;Servei integral amb cartografia;Campanyes periòdiques comparables"],
        ["Lliurables", "Informe tècnic i resum executiu;Ortofoto i mapa d’incidències;Fitxes amb imatge tèrmica i RGB;Capes GIS i dades per a GMAO"]
      ],
      closing: "Informació tècnica per localitzar pèrdues, ordenar actuacions i documentar l’estat de la planta.",
      cta: "Explica’ns el teu projecte"
    },
    industrial: {
      summary: "Conèixer la inspecció industrial",
      kicker: "Actius industrials i infraestructures",
      heading: "Inspecció traçable amb menys exposició del personal",
      intro: "Documentem instal·lacions, cobertes, estructures i equips de difícil accés mitjançant imatge RGB, termografia i cartografia, generant evidències localitzades per a manteniment, enginyeria i seguiment d’actius.",
      areas: [
        ["Inspecció visual RGB", "Documentació d’alta resolució de l’estat general i dels punts crítics.", "Corrosió, deformacions i trencaments;Cobertes, estructures i equips elevats;Fotografia i vídeo tècnic localitzat"],
        ["Termografia industrial", "Identificació d’anomalies tèrmiques i zones que requereixen revisió.", "Punts calents i contrastos anòmals;Equips elèctrics i processos tèrmics;Suport al manteniment predictiu"],
        ["Fotogrametria i cartografia", "Representació mètrica de l’actiu per mesurar, comparar i contextualitzar.", "Ortofotos i models tridimensionals;Mesuraments i aixecaments de suport;Seguiment temporal d’instal·lacions"],
        ["Gestió d’incidències", "Informació estructurada i compatible amb els sistemes tècnics del client.", "Fitxes i inventaris georeferenciats;Priorització i traçabilitat;Integració GIS, CAD i GMAO"]
      ],
      process: ["Com treballem", "Una operació adaptada a l’entorn industrial", "Coordinem el vol amb els requisits operatius, legals i preventius de la instal·lació.", "Planificació: emplaçament, riscos, permisos, HSE i pla de seguretat.;Inspecció: captura RGB, tèrmica i mètrica amb validació en planta.;Lliurament: processament, informe, fitxes d’incidència i integració corporativa."],
      columns: [
        ["Aplicacions", "Cobertes i estructures;Subestacions i actius energètics;Equips elevats i zones complexes;Comparació temporal d’actius"],
        ["Modalitats", "Inspecció documental i visual;RGB i tèrmica georeferenciada;Inspecció i cartografia integral;Seguiment recurrent"],
        ["Lliurables", "Informe i fitxes d’incidències;Inventari fotogràfic localitzat;Ortofotos i models 3D;Capes GIS, CAD i dades per a GMAO"]
      ],
      closing: "Evidències tècniques clares per inspeccionar actius complexos i planificar el manteniment amb més seguretat.",
      cta: "Explica’ns el teu projecte"
    },
    research: {
      summary: "Conèixer el servei mediambiental",
      kicker: "Observació i gestió del medi natural",
      heading: "Lectura tèrmica i espacial per orientar decisions de camp",
      intro: "Combinem termografia aèria, imatge RGB i cartografia per localitzar indicis, prioritzar inspeccions i documentar canvis en fauna, vegetació, aigua, zones restaurades i superfícies forestals.",
      areas: [
        ["Fauna i biodiversitat", "Observació complementària en àrees extenses o de visibilitat limitada.", "Deteccions i zones d’activitat;Prospecció prèvia a actuacions;Suport a censos i gestió cinegètica"],
        ["Vigilància ambiental", "Detecció primerenca d’anomalies i àrees que requereixen comprovació.", "Punts calents i incidències;Abocaments i anomalies en masses d’aigua;Mapes de prioritat d’inspecció"],
        ["Hàbitats i restauració", "Seguiment comparable de l’evolució de terrenys i actuacions.", "Revegetació i cobertura vegetal;Aiguamolls, riberes i zones degradades;Comparació entre campanyes"],
        ["Gestió forestal", "Suport espacial per planificar i documentar treballs sobre el bosc.", "Rodals, pistes i tallafocs;Desbrossaments i tractaments silvícoles;Superfícies tractades i incidències"]
      ],
      process: ["Com treballem", "Una campanya dissenyada al voltant de la pregunta ambiental", "Definim horari, sensors i metodologia segons el fenomen que s’ha d’observar.", "Planificació: objectiu, cartografia, permisos i condicionants ambientals.;Camp: captura tèrmica i RGB amb metadades i mínima pertorbació.;Anàlisi: georeferenciació, interpretació, limitacions i recomanacions."],
      columns: [
        ["Aplicacions", "Seguiment de fauna i hàbitats;Vigilància ambiental d’obres;Restauració i compensacions;Treballs forestals i masses d’aigua"],
        ["Modalitats", "Diagnosi puntual;Campanya periòdica de seguiment;Suport urgent davant incidències;Línia forestal específica"],
        ["Lliurables", "Informe tècnic i mapes tèrmics;Inventari de deteccions;Capes GIS i taules d’observacions;Comparatives i recomanacions"]
      ],
      closing: "Observació prudent i traçable per reduir la incertesa abans d’actuar sobre el medi natural.",
      cta: "Explica’ns el teu projecte"
    }
  },
  en: {
    photovoltaic: {
      summary: "Explore our energy service",
      kicker: "Drone-based photovoltaic inspection",
      heading: "Technical diagnostics to prioritise maintenance",
      intro: "We inspect solar plants using thermal and RGB sensors to detect issues, understand the actual condition of assets and turn aerial capture into traceable information for operations and maintenance.",
      areas: [
        ["Module thermography", "Detection of thermal anomalies associated with performance losses.", "Hot spots and abnormal patterns;Modules, strings and connections;Incident classification and priority"],
        ["RGB visual inspection", "High-resolution documentation for assessing visible damage and context.", "Breakage, soiling and shading;Vegetation, fencing and access routes;Georeferenced photographic evidence"],
        ["Plant mapping", "Continuous site coverage for inventories, civil works and monitoring.", "Technical orthophoto and inventory;Drainage, roads and erosion;Comparison between surveys"],
        ["Maintenance data", "Results prepared for integration into the client’s workflows.", "Incident maps and records;GIS layers and structured tables;Integration with CMMS and internal systems"]
      ],
      process: ["How we work", "From planning to the technical report", "The scope is tailored to the plant size and maintenance objective.", "Planning: UAS feasibility, scope, safety and flight plan.;Capture: thermal and RGB flights with field quality control.;Delivery: analysis, georeferenced issues and data integration."],
      columns: [
        ["Applications", "Module and string diagnostics;Vegetation and soiling control;Drainage and civil works review;Periodic asset monitoring"],
        ["Service options", "Basic thermal inspection;RGB and thermal inspection;Comprehensive mapping service;Comparable periodic surveys"],
        ["Deliverables", "Technical report and executive summary;Orthophoto and incident map;Thermal and RGB incident records;GIS layers and CMMS-ready data"]
      ],
      closing: "Technical information to locate losses, prioritise work and document the condition of the plant.",
      cta: "Tell us about your project"
    },
    industrial: {
      summary: "Explore our industrial inspection service",
      kicker: "Industrial assets and infrastructure",
      heading: "Traceable inspection with reduced personnel exposure",
      intro: "We document facilities, roofs, structures and hard-to-access equipment using RGB imagery, thermography and mapping, producing localised evidence for maintenance, engineering and asset monitoring.",
      areas: [
        ["RGB visual inspection", "High-resolution documentation of general condition and critical points.", "Corrosion, deformation and breakage;Roofs, structures and elevated equipment;Localised technical photography and video"],
        ["Industrial thermography", "Identification of thermal anomalies and areas requiring review.", "Hot spots and abnormal contrasts;Electrical equipment and thermal processes;Support for predictive maintenance"],
        ["Photogrammetry and mapping", "Metric representation of assets for measurement, comparison and context.", "Orthophotos and three-dimensional models;Supporting measurements and surveys;Time-based facility monitoring"],
        ["Incident management", "Structured information compatible with the client’s technical systems.", "Georeferenced records and inventories;Prioritisation and traceability;GIS, CAD and CMMS integration"]
      ],
      process: ["How we work", "An operation tailored to the industrial environment", "We coordinate the flight with the facility’s operational, legal and safety requirements.", "Planning: site, risks, permits, HSE and safety plan.;Inspection: RGB, thermal and metric capture with on-site validation.;Delivery: processing, report, incident records and corporate integration."],
      columns: [
        ["Applications", "Roofs and structures;Substations and energy assets;Elevated equipment and complex areas;Time-based asset comparison"],
        ["Service options", "Documentary and visual inspection;Georeferenced RGB and thermal inspection;Comprehensive inspection and mapping;Recurring monitoring"],
        ["Deliverables", "Report and incident records;Localised photographic inventory;Orthophotos and 3D models;GIS/CAD layers and CMMS-ready data"]
      ],
      closing: "Clear technical evidence for inspecting complex assets and planning maintenance more safely.",
      cta: "Tell us about your project"
    },
    research: {
      summary: "Explore our environmental service",
      kicker: "Observation and management of the natural environment",
      heading: "Thermal and spatial insight to guide field decisions",
      intro: "We combine aerial thermography, RGB imagery and mapping to locate signs, prioritise inspections and document changes in wildlife, vegetation, water, restored areas and forest land.",
      areas: [
        ["Wildlife and biodiversity", "Complementary observation across large or low-visibility areas.", "Detections and activity areas;Pre-work surveys;Support for counts and wildlife management"],
        ["Environmental monitoring", "Early detection of anomalies and areas requiring field verification.", "Hot spots and incidents;Discharges and anomalies in water bodies;Inspection-priority maps"],
        ["Habitats and restoration", "Comparable monitoring of changes in land and interventions.", "Revegetation and plant cover;Wetlands, riverbanks and degraded areas;Comparison between surveys"],
        ["Forestry", "Spatial support for planning and documenting work in forest areas.", "Compartments, tracks and firebreaks;Clearing and silvicultural treatments;Treated areas and incidents"]
      ],
      process: ["How we work", "A survey designed around the environmental question", "We define timing, sensors and methodology according to the phenomenon to be observed.", "Planning: objective, mapping, permits and environmental constraints.;Fieldwork: thermal and RGB capture with metadata and minimal disturbance.;Analysis: georeferencing, interpretation, limitations and recommendations."],
      columns: [
        ["Applications", "Wildlife and habitat monitoring;Environmental monitoring of works;Restoration and offsets;Forestry and water bodies"],
        ["Service options", "One-off assessment;Periodic monitoring campaign;Urgent incident support;Dedicated forestry service"],
        ["Deliverables", "Technical report and thermal maps;Detection inventory;GIS layers and observation tables;Comparisons and recommendations"]
      ],
      closing: "Careful, traceable observation to reduce uncertainty before intervening in the natural environment.",
      cta: "Tell us about your project"
    }
  },
  fr: {
    photovoltaic: {
      summary: "Découvrir le service énergie",
      kicker: "Inspection photovoltaïque par drone",
      heading: "Un diagnostic technique pour prioriser la maintenance",
      intro: "Nous inspectons les centrales solaires avec des capteurs thermiques et RGB afin de détecter les incidents, connaître l’état réel des actifs et transformer l’acquisition aérienne en informations traçables pour l’exploitation et la maintenance.",
      areas: [
        ["Thermographie des modules", "Localisation des anomalies thermiques associées aux pertes de rendement.", "Points chauds et comportements anormaux;Modules, strings et connexions;Classification et priorité des incidents"],
        ["Inspection visuelle RGB", "Documentation haute résolution pour évaluer les dommages visibles et leur contexte.", "Casse, salissures et ombrage;Végétation, clôtures et accès;Preuves photographiques géoréférencées"],
        ["Cartographie de la centrale", "Vue continue du site pour l’inventaire, le génie civil et le suivi.", "Orthophoto technique et inventaire;Drainage, pistes et érosion;Comparaison entre campagnes"],
        ["Données de maintenance", "Résultats préparés pour s’intégrer aux processus du client.", "Cartes et fiches d’incidents;Couches SIG et tableaux structurés;Intégration GMAO et systèmes internes"]
      ],
      process: ["Notre méthode", "De la planification au rapport technique", "Le périmètre est adapté à la taille de la centrale et à l’objectif de maintenance.", "Planification : faisabilité UAS, périmètre, sécurité et plan de vol.;Acquisition : vols thermiques et RGB avec contrôle qualité sur site.;Livraison : analyse, incidents géoréférencés et intégration des données."],
      columns: [
        ["Applications", "Diagnostic des modules et strings;Contrôle de la végétation et des salissures;Vérification du drainage et du génie civil;Suivi périodique des actifs"],
        ["Modalités", "Inspection thermique de base;Inspection RGB et thermique;Service complet avec cartographie;Campagnes périodiques comparables"],
        ["Livrables", "Rapport technique et synthèse;Orthophoto et carte des incidents;Fiches avec images thermiques et RGB;Couches SIG et données pour GMAO"]
      ],
      closing: "Des informations techniques pour localiser les pertes, hiérarchiser les actions et documenter l’état de la centrale.",
      cta: "Parlez-nous de votre projet"
    },
    industrial: {
      summary: "Découvrir l’inspection industrielle",
      kicker: "Actifs industriels et infrastructures",
      heading: "Une inspection traçable avec moins d’exposition du personnel",
      intro: "Nous documentons les installations, toitures, structures et équipements difficiles d’accès grâce à l’imagerie RGB, la thermographie et la cartographie, en produisant des preuves localisées pour la maintenance, l’ingénierie et le suivi des actifs.",
      areas: [
        ["Inspection visuelle RGB", "Documentation haute résolution de l’état général et des points critiques.", "Corrosion, déformations et ruptures;Toitures, structures et équipements en hauteur;Photographies et vidéos techniques localisées"],
        ["Thermographie industrielle", "Identification des anomalies thermiques et des zones à contrôler.", "Points chauds et contrastes anormaux;Équipements électriques et processus thermiques;Appui à la maintenance prédictive"],
        ["Photogrammétrie et cartographie", "Représentation métrique de l’actif pour mesurer, comparer et contextualiser.", "Orthophotos et modèles tridimensionnels;Mesures et levés complémentaires;Suivi temporel des installations"],
        ["Gestion des incidents", "Informations structurées compatibles avec les systèmes techniques du client.", "Fiches et inventaires géoréférencés;Priorisation et traçabilité;Intégration SIG, CAO et GMAO"]
      ],
      process: ["Notre méthode", "Une opération adaptée à l’environnement industriel", "Nous coordonnons le vol avec les exigences opérationnelles, légales et préventives du site.", "Planification : site, risques, autorisations, HSE et plan de sécurité.;Inspection : acquisition RGB, thermique et métrique avec validation sur site.;Livraison : traitement, rapport, fiches d’incidents et intégration métier."],
      columns: [
        ["Applications", "Toitures et structures;Sous-stations et actifs énergétiques;Équipements en hauteur et zones complexes;Comparaison temporelle des actifs"],
        ["Modalités", "Inspection documentaire et visuelle;RGB et thermique géoréférencées;Inspection et cartographie complètes;Suivi récurrent"],
        ["Livrables", "Rapport et fiches d’incidents;Inventaire photographique localisé;Orthophotos et modèles 3D;Couches SIG/CAO et données GMAO"]
      ],
      closing: "Des preuves techniques claires pour inspecter les actifs complexes et planifier la maintenance avec davantage de sécurité.",
      cta: "Parlez-nous de votre projet"
    },
    research: {
      summary: "Découvrir le service environnemental",
      kicker: "Observation et gestion du milieu naturel",
      heading: "Une lecture thermique et spatiale pour guider les décisions de terrain",
      intro: "Nous associons thermographie aérienne, imagerie RGB et cartographie pour localiser des indices, prioriser les inspections et documenter les changements concernant la faune, la végétation, l’eau, les zones restaurées et les surfaces forestières.",
      areas: [
        ["Faune et biodiversité", "Observation complémentaire dans les zones étendues ou peu visibles.", "Détections et zones d’activité;Prospection avant intervention;Appui aux comptages et à la gestion cynégétique"],
        ["Surveillance environnementale", "Détection précoce des anomalies et des zones à vérifier.", "Points chauds et incidents;Rejets et anomalies dans les masses d’eau;Cartes de priorité d’inspection"],
        ["Habitats et restauration", "Suivi comparable de l’évolution des terrains et des interventions.", "Revégétalisation et couverture végétale;Zones humides, berges et espaces dégradés;Comparaison entre campagnes"],
        ["Gestion forestière", "Appui spatial pour planifier et documenter les travaux forestiers.", "Parcelles, pistes et pare-feu;Débroussaillement et traitements sylvicoles;Surfaces traitées et incidents"]
      ],
      process: ["Notre méthode", "Une campagne conçue autour de la question environnementale", "Nous définissons l’horaire, les capteurs et la méthode selon le phénomène à observer.", "Planification : objectif, cartographie, autorisations et contraintes environnementales.;Terrain : acquisition thermique et RGB avec métadonnées et perturbation minimale.;Analyse : géoréférencement, interprétation, limites et recommandations."],
      columns: [
        ["Applications", "Suivi de la faune et des habitats;Surveillance environnementale des travaux;Restauration et mesures compensatoires;Travaux forestiers et masses d’eau"],
        ["Modalités", "Diagnostic ponctuel;Campagne de suivi périodique;Appui urgent en cas d’incident;Service forestier spécifique"],
        ["Livrables", "Rapport technique et cartes thermiques;Inventaire des détections;Couches SIG et tableaux d’observations;Comparaisons et recommandations"]
      ],
      closing: "Une observation prudente et traçable pour réduire l’incertitude avant toute intervention sur le milieu naturel.",
      cta: "Parlez-nous de votre projet"
    }
  },
  pt: {
    photovoltaic: {
      summary: "Conhecer o serviço de energia",
      kicker: "Inspeção fotovoltaica com drone",
      heading: "Diagnóstico técnico para priorizar a manutenção",
      intro: "Inspecionamos centrais solares com sensores térmicos e RGB para detetar incidências, conhecer o estado real dos ativos e transformar a aquisição aérea em informação rastreável para operação e manutenção.",
      areas: [
        ["Termografia de módulos", "Localização de anomalias térmicas associadas a perdas de rendimento.", "Pontos quentes e padrões anómalos;Módulos, strings e ligações;Classificação e prioridade das incidências"],
        ["Inspeção visual RGB", "Documentação de alta resolução para avaliar danos visíveis e o seu contexto.", "Quebras, sujidade e sombreamento;Vegetação, vedações e acessos;Evidências fotográficas georreferenciadas"],
        ["Cartografia da central", "Visão contínua do local para inventário, obra civil e monitorização.", "Ortofoto técnica e inventário;Drenagens, caminhos e erosão;Comparação entre campanhas"],
        ["Dados para manutenção", "Resultados preparados para integração nos processos do cliente.", "Mapas e fichas de incidências;Camadas SIG e tabelas estruturadas;Integração com GMAO e sistemas internos"]
      ],
      process: ["Como trabalhamos", "Do planeamento ao relatório técnico", "O âmbito é adaptado à dimensão da central e ao objetivo de manutenção.", "Planeamento: viabilidade UAS, âmbito, segurança e plano de voo.;Aquisição: voos térmicos e RGB com controlo de qualidade em campo.;Entrega: análise, incidências georreferenciadas e integração de dados."],
      columns: [
        ["Aplicações", "Diagnóstico de módulos e strings;Controlo de vegetação e sujidade;Revisão de drenagens e obra civil;Monitorização periódica de ativos"],
        ["Modalidades", "Inspeção térmica básica;Inspeção RGB e térmica;Serviço integral com cartografia;Campanhas periódicas comparáveis"],
        ["Entregáveis", "Relatório técnico e resumo executivo;Ortofoto e mapa de incidências;Fichas com imagem térmica e RGB;Camadas SIG e dados para GMAO"]
      ],
      closing: "Informação técnica para localizar perdas, ordenar intervenções e documentar o estado da central.",
      cta: "Conte-nos sobre o seu projeto"
    },
    industrial: {
      summary: "Conhecer a inspeção industrial",
      kicker: "Ativos industriais e infraestruturas",
      heading: "Inspeção rastreável com menor exposição do pessoal",
      intro: "Documentamos instalações, coberturas, estruturas e equipamentos de difícil acesso através de imagem RGB, termografia e cartografia, gerando evidências localizadas para manutenção, engenharia e monitorização de ativos.",
      areas: [
        ["Inspeção visual RGB", "Documentação de alta resolução do estado geral e dos pontos críticos.", "Corrosão, deformações e ruturas;Coberturas, estruturas e equipamentos elevados;Fotografia e vídeo técnico localizado"],
        ["Termografia industrial", "Identificação de anomalias térmicas e zonas que necessitam de revisão.", "Pontos quentes e contrastes anómalos;Equipamentos elétricos e processos térmicos;Apoio à manutenção preditiva"],
        ["Fotogrametria e cartografia", "Representação métrica do ativo para medir, comparar e contextualizar.", "Ortofotos e modelos tridimensionais;Medições e levantamentos de apoio;Monitorização temporal das instalações"],
        ["Gestão de incidências", "Informação estruturada e compatível com os sistemas técnicos do cliente.", "Fichas e inventários georreferenciados;Priorização e rastreabilidade;Integração SIG, CAD e GMAO"]
      ],
      process: ["Como trabalhamos", "Uma operação adaptada ao ambiente industrial", "Coordenamos o voo com os requisitos operacionais, legais e preventivos da instalação.", "Planeamento: local, riscos, licenças, HSE e plano de segurança.;Inspeção: aquisição RGB, térmica e métrica com validação na instalação.;Entrega: processamento, relatório, fichas de incidência e integração empresarial."],
      columns: [
        ["Aplicações", "Coberturas e estruturas;Subestações e ativos energéticos;Equipamentos elevados e zonas complexas;Comparação temporal de ativos"],
        ["Modalidades", "Inspeção documental e visual;RGB e térmica georreferenciada;Inspeção e cartografia integral;Monitorização recorrente"],
        ["Entregáveis", "Relatório e fichas de incidências;Inventário fotográfico localizado;Ortofotos e modelos 3D;Camadas SIG/CAD e dados para GMAO"]
      ],
      closing: "Evidências técnicas claras para inspecionar ativos complexos e planear a manutenção com maior segurança.",
      cta: "Conte-nos sobre o seu projeto"
    },
    research: {
      summary: "Conhecer o serviço ambiental",
      kicker: "Observação e gestão do meio natural",
      heading: "Leitura térmica e espacial para orientar decisões de campo",
      intro: "Combinamos termografia aérea, imagem RGB e cartografia para localizar indícios, priorizar inspeções e documentar alterações na fauna, vegetação, água, zonas restauradas e superfícies florestais.",
      areas: [
        ["Fauna e biodiversidade", "Observação complementar em áreas extensas ou com visibilidade limitada.", "Deteções e zonas de atividade;Prospeção antes de intervenções;Apoio a censos e gestão cinegética"],
        ["Vigilância ambiental", "Deteção precoce de anomalias e áreas que necessitam de verificação.", "Pontos quentes e incidências;Descargas e anomalias em massas de água;Mapas de prioridade de inspeção"],
        ["Habitats e restauração", "Monitorização comparável da evolução dos terrenos e intervenções.", "Revegetação e cobertura vegetal;Zonas húmidas, margens e áreas degradadas;Comparação entre campanhas"],
        ["Gestão florestal", "Apoio espacial para planear e documentar trabalhos florestais.", "Talhões, caminhos e corta-fogos;Desmatações e tratamentos silvícolas;Superfícies tratadas e incidências"]
      ],
      process: ["Como trabalhamos", "Uma campanha concebida em torno da questão ambiental", "Definimos horário, sensores e metodologia de acordo com o fenómeno a observar.", "Planeamento: objetivo, cartografia, licenças e condicionantes ambientais.;Campo: aquisição térmica e RGB com metadados e perturbação mínima.;Análise: georreferenciação, interpretação, limitações e recomendações."],
      columns: [
        ["Aplicações", "Monitorização de fauna e habitats;Vigilância ambiental de obras;Restauração e compensações;Trabalhos florestais e massas de água"],
        ["Modalidades", "Diagnóstico pontual;Campanha periódica de monitorização;Apoio urgente em incidências;Linha florestal específica"],
        ["Entregáveis", "Relatório técnico e mapas térmicos;Inventário de deteções;Camadas SIG e tabelas de observações;Comparações e recomendações"]
      ],
      closing: "Observação prudente e rastreável para reduzir a incerteza antes de atuar sobre o meio natural.",
      cta: "Conte-nos sobre o seu projeto"
    }
  }
};
