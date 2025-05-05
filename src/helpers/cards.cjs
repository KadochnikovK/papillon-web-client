/* eslint-disable no-param-reassign */
/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable object-curly-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable unicorn/no-reduce */
//------------------------------------------------------------------------------
// webscan-lb-server/models/cards.js v3.28 10.11.2021 Gvozdev M.A.
//------------------------------------------------------------------------------
const fsp = require('fs').promises
const path = require('path')
const nodeNist = require('node-nist-max')
const sizeImage = require('image-size-max')
const ADIS_TAGS = [ // id - Тег АДИС, nist - номер в NIST, mask - порядок в маске (слева направо!), type - номер записи NIST
  { id: 705,  cmd: -1, nist: 0,  mask: 0,  type: 10, name: 'Face frontal'  },       // 'Фас',                          RUS-I Type-10
  { id: 706,  cmd: -1, nist: 0,  mask: 0,  type: 10, name: 'Left profile'  },       // 'Левый профиль',                RUS-I Type-10
  { id: 2200, cmd: -1, nist: 0,  mask: 0,  type: 10, name: 'Right profile' },       // 'Правый профиль',               RUS-I Type-10
  { id: 720,  cmd: 0,  nist: 1,  mask: 1,  type: 14, name: 'Right Thumb finger' },  // 'Правый большой',               RUS-I Type-14 - 1
  { id: 721,  cmd: 1,  nist: 2,  mask: 2,  type: 14, name: 'Right Index finger' },  // 'Правый указательный',          RUS-I Type-14 - 2
  { id: 722,  cmd: 2,  nist: 3,  mask: 3,  type: 14, name: 'Right Middle finger'},  // 'Правый средний',               RUS-I Type-14 - 3
  { id: 723,  cmd: 3,  nist: 4,  mask: 4,  type: 14, name: 'Right Ring finger'  },  // 'Правый безымянный',            RUS-I Type-14 - 4
  { id: 724,  cmd: 4,  nist: 5,  mask: 5,  type: 14, name: 'Right Little finger'},  // 'Правый мизинец',               RUS-I Type-14 - 5
  { id: 725,  cmd: 5,  nist: 6,  mask: 6,  type: 14, name: 'Left Thumb finger'  },  // 'Левый большой',                RUS-I Type-14 - 6
  { id: 726,  cmd: 6,  nist: 7,  mask: 7,  type: 14, name: 'Left Index finger'  },  // 'Левый указательный',           RUS-I Type-14 - 7
  { id: 727,  cmd: 7,  nist: 8,  mask: 8,  type: 14, name: 'Left Middle finger' },  // 'Левый средний',                RUS-I Type-14 - 8
  { id: 728,  cmd: 8,  nist: 9,  mask: 9,  type: 14, name: 'Left Ring finger'   },  // 'Левый безымянный',             RUS-I Type-14 - 9
  { id: 729,  cmd: 9,  nist: 10, mask: 10, type: 14, name: 'Left Little finger' },  // 'Левый мизинец',                RUS-I Type-14 - 10
  { id: 736,  cmd: 12, nist: 11, mask: 3,  type: 14, name: 'Plain Right thumb'  },  // 'Контрольные (правый большой)', RUS-I Type-14 - 11
  { id: 735,  cmd: 11, nist: 12, mask: 2,  type: 14, name: 'Plain Left thumb'   },  // 'Контрольные (левый большой)',  RUS-I Type-14 - 12
  { id: 737,  cmd: 13, nist: 13, mask: 4,  type: 14, name: 'Plain Right four fingers' }, // 'Контрольные (правые 4)',  RUS-I Type-14 - 13
  { id: 734,  cmd: 10, nist: 14, mask: 1,  type: 14, name: 'Plain Left four fingers'  }, // 'Контрольные (левые 4),    RUS-I Type-14 - 14
  { id: 732,  cmd: 14, nist: 23, mask: 1,  type: 15, name: 'Left Full palm'     },  // 'Левая ладонь',                 RUS-I Type-15 - 23
  { id: 740,  cmd: 18, nist: 34, mask: 2,  type: 15, name: 'Left Upper palm'    },  // 'Левая ладонь верх',            RUS-I Type-15 - 34 ???
  { id: 742,  cmd: 14, nist: 27, mask: 3,  type: 15, name: 'Left lower palm'    },  // 'Левая ладонь низ,              RUS-I Type-15 - 27
  { id: 738,  cmd: 16, nist: 24, mask: 4,  type: 15, name: 'Left Writer’s palm' },  // 'Ребро левой ладони',           RUS-I Type-15 - 24
  { id: 733,  cmd: 15, nist: 21, mask: 5,  type: 15, name: 'Right Full palm'    },  // 'Правая ладонь',                RUS-I Type-15 - 21
  { id: 741,  cmd: 19, nist: 31, mask: 6,  type: 15, name: 'Right Upper palm'   },  // 'Правая ладонь верх',           RUS-I Type-15 - 31 ???
  { id: 743,  cmd: 15, nist: 25, mask: 7,  type: 15, name: 'Right lower palm'   },  // 'Правая ладонь низ',            RUS-I Type-15 - 25
  { id: 739,  cmd: 17, nist: 22, mask: 8,  type: 15, name: 'Right Writer’s palm'},  // 'Ребро правой ладони',          RUS-I Type-15 - 22
]
const ADIS_PHOTO_TAGS = {
  FACE_FRONTAL:  705,
  LEFT_PROFILE:  706,
  RIGHT_PROFILE: 2200,
}
// const {
//   ADIS_TAGS,
//   ADIS_PHOTO_TAGS
// } = require('webscan-lib') // PRINT_STATUS
// const {
//   fileDS: {
//     root: STORAGE_ROOT,
//     export: EXPORT_CONTAINER
//   }
// } = require('../datasources.json') // => E:/Max4Git/WebScan/storage ???
// const {
//   ServerError,
//   getWhereIDs,
//   getFullPath,
//   changeFileExt,
//   removeExportFiles,
// } = require('../utils') // getCardContainer ???
//------------------------------------------------------------------------------
const EXPORT_NIST_EXT = 'nist' // Расширение файла карты (при экспорте)
//------------------------------------------------------------------------------

//- Функция находит либо создаёт контейнер с именем - cardId -------------------
async function getCardContainer(container, cardId) {
  const containers = await container.getContainers()
  const cont = await containers.find(e => e.name === cardId)
  return cont !== undefined ? cont : container.createContainer({
    name: cardId
  })
}
//------------------------------------------------------------------------------

//- Функция возвращает тип сжатия фото-изображения NIST (поле CGA) -------------
function getNistCGA(mime) {
  return (mime === 'image/jpeg') ? 'JPEGB' :
    (mime === 'image/jp2') || (mime === 'image/jpm') || (mime === 'image/jpx') ? 'JP2' :
    (mime === 'image/png') ? 'PNG' : ''
}
//------------------------------------------------------------------------------

//- Функция возвращает положение субьекта NIST (поле POS) ----------------------
function getNistPOS(adisTag) {
  return (adisTag === ADIS_PHOTO_TAGS.FACE_FRONTAL) ? 'F' : // Анфас - F, Правый профиль (90 градусов) - R, Левый профиль (90 градусов) - L, Снятый под углом - A
    (adisTag === ADIS_PHOTO_TAGS.LEFT_PROFILE) ? 'L' :
    (adisTag === ADIS_PHOTO_TAGS.RIGHT_PROFILE) ? 'R' : 'A'
}
//------------------------------------------------------------------------------

//- Функция возвращает номер пальца NIST (поле FGP) по номеру тега АДИС --------
function getAdisTag(adisId) {
  return ADIS_TAGS.find(value => value.id == adisId)
}
//------------------------------------------------------------------------------

//- Функция создаёт уникальное имя файла карты (с заданным расширением) --------
const newCardName = (cardId, cardExt) => `card-${cardId}-${Date.now()}.${cardExt}`
//------------------------------------------------------------------------------

//- Функция поиска файлов экспорта для карты - cardId -------------------------- 
async function findExportFiles(cardId) {
  const files = await fsp.readdir(path.join(STORAGE_ROOT, EXPORT_CONTAINER).toString()) // Читаем весь каталог экспорта! 
  return files.filter(fname => fname.startsWith(`card-${cardId}-`) && !fname.endsWith('pdf')) // Все файлы экспорта карты - cardI, кроме pdf!
}
//------------------------------------------------------------------------------

//- Функция удаления фалов экспорта карт ---------------------------------------
async function delExportFiles(fnames) {
  const delFiles = fnames.map(fname => fsp.unlink(path.join(STORAGE_ROOT, EXPORT_CONTAINER, fname)))
  return Promise.all(delFiles)
}
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
function getDateString(value) { // Строка в формате: YYYYMMDDD
  if (value) {
    const date = new Date(value) // Дата приходит как строка!    
    if (!Number.isNaN(date)) {
      return date.toISOString().replace(/\D/g, '').slice(0, 8) // Cтрока: 2020-06-30T08:43:18.548Z -> 20200630
    }
  }
  console.warn('getDateString, argument is bad Date value:', value)
  return ''
}
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
function getGMTString(value) { // Строка в формате: YYYY MM DDD HH MM SS Z
  if (value) {
    const date = new Date(value) // Дата приходит как строка!   
    if (!Number.isNaN(date)) {
      return `${date.toISOString().replace(/\D/g, '').slice(0, 14)}Z` // Cтрока: 2020-06-30T08:43:18.548Z -> 20200630084318Z
    }
  }
  console.warn('getGMTString, argument is bad Date value:', value)
  return ''
}
//------------------------------------------------------------------------------

//- Функция асинхронной записи файла карты на диск -----------------------------
async function writeFileCard(fullPath, card) {
  return fsp.writeFile(fullPath, card, 'utf8')
}
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
const getPhotoObjects = (images) => images.map(image => ({
  tag: image.tagNum,
  date: image.createdAt,
  mime: image.fileType, // "image/jpeg", "image/jp2", "image/png" 
  filePath: getFullPath(image.container, image.fileName),
}))
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
const getFPrintObjects = (images) => images.map(image => ({
  tag: image.tagNum,
  date: image.createdAt,
  //fileType: image.fileType,                         // "image/jpeg", "image/png" ???
  filePath: getFullPath(image.container, image.fileName, '.wsq')
}))
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
const addCardObjects = (images, initCard) => images.reduce((card, image) => {
  card.imageTags[image.tagNum] = {
    date: image.createdAt,
    error: image.errorScan,
    file: getFullPath(image.container, image.fileName),
    fileUrl: image.fileUrl,
  }
  //------------------------------------------------------------------------------  
  if (image.statScan) { // Только для отпечатков!
    card.statTags = image.statScan.reduceRight((newStats, statRec) => !statRec.mult && newStats.some(rec => rec.tag === statRec.tag) ?
      newStats : [...newStats, {
        tag: statRec.tag,
        value: statRec.data
      }], card.statTags)
  }
  return card
}, initCard)
//------------------------------------------------------------------------------

//- Функция формирует карту АДИС в виде JSON (из описаний обьектов) ------------
function getAdisCard(card, photos, fprints) {
  let cardObj = { // Выбрать только нужные поля из карты!!!  
    textTags: { // Набор текстовых тегов для экспорта. Если значения нет ???
      107: card.dob,
      108: card.gender,
      111: card.name,
    },
    imageTags: {},
    statTags: [], // Массив, есть повторяющиеся теги!!!       
  }
  //- Добавляем описание фото / отпечатков в карту АДИС --------------------------
  cardObj = addCardObjects(photos, cardObj)
  cardObj = addCardObjects(fprints, cardObj)
  //- Получаем все поля соответствующие типу карты из обьекта карты в базе ------- 
  const fieldsError = []

  Object.keys(card).filter(key => key.startsWith('adis_')).forEach(fieldName => { // Выделяем поля типа: "adis_1_111"
    const fieldId = fieldName.split('_') // 0 - Prefix, 1 - Record type, 2 - Record num 
    if (fieldId.length === 3) {
      const recType = Number.parseInt(fieldId[1], 10)
      const recNum = Number.parseInt(fieldId[2], 10)

      if (!Number.isNaN(recType) && recType === 1 && // 1..99 ??? 
        !Number.isNaN(recNum) && recNum >= 105 && recNum <= 2573) { // Debug!!!

        const val = card[fieldName] && card[fieldName].trim() // Значение поля  
        if (val) { // Пустые поля не записываем ???
          if (cardObj.textTags) { // Обьект данного типа записи уже существует!
            cardObj.textTags[recNum] = val // Новое поле обьекта
          } else {
            cardObj.textTags = {
              recNum: val
            } // Новый обьект данного типа
          }
        }
        return // O.K!
      }
    }

    fieldsError.push(`Invalid field ID: ${fieldName}`) // Error!       
    console.warn(`Invalid field ID: ${fieldName}`) // Debug!!!
  })
  //------------------------------------------------------------------------------
  //console.log('Export adisObject: %O, error: %O', cardObj, fieldsError) // Debug!!!  
  if (fieldsError.length > 0) {
    throw new ServerError(`Processing custom card fields: ${fieldsError.join(', ')}`, 422, 'BAD_CUSTOM_FIELD') // Выходим с массивом ошибок!
  }
  return JSON.stringify(cardObj, undefined, 2)
}
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
async function getNistCard(config, card, userName, appVersion, photos, fprints) {
  const NIST_VER = '0300' // Версия спецификации RUS-I (const)
  const currDate = 20200630
  // const currDate = new Date()

  const maskFingers = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'] // 10
  const maskPalms = ['0', '0', '0', '0', '0', '0', '0', '0'] // 8
  const maskControls = ['0', '0', '0', '0'] // 4

  let nameArray = ['', '', ''] // Name - Nam, Состоит из трех подполей (Фамилия, Имя, Отчество) -> [['Иванов', 'Иван', 'Иванович']]
  if (card.name && card.name.length > 0) {
    nameArray = card.name.split(' ', 3) // Не более 3 элементов!
  }
  //------------------------------------------------------------------------------

  //- Функция модифицирует маски наличия пальцев / ладоней / контрольные ---------
  function updateFingerMask(adisId) { // При async в цикле не будет проблем с потерей пред. данных ???
    const {
      nist,
      mask
    } = getAdisTag(adisId)
    const pos = mask - 1 // >= 0

    if (nist <= 10) { // 1..10
      maskFingers[pos] = '1'
    } else if (nist < 15) { // 11..14
      maskControls[pos] = '1'
    } else if (nist >= 21) { // 21...
      maskPalms[pos] = '1'
    }
  }
  //------------------------------------------------------------------------------

  //- Формируем обьект карты -----------------------------------------------------
  const nistObj = {
    1: { // Type 1, Информация о транзакции
      2: NIST_VER, // VER - Version number (Константа!)
      4: config.nistTot, // TOT - Type of transaction (ATR - Add To Print Collection) У Коли стоит - NPS! Настраиваемое пользователем?
      5: getDateString(currDate), // DAT - Date, Дата начала транзакции, 8 цифр в формате: YYYYMMDDD (Дата экспорта карты?)
      //  6: '1',                      // PRY - Priority, Диапазон возможных значений – от 1 до 9, где 1 выражает наивысший приоритет. Настраиваемое пользователем ?
      7: config.nistDai, // DAI - Destination agency identifier, Наименование агентства-получателя по ОКАТО. Настраиваемое пользователем?
      8: config.nistOri, // ORI - Originating agency identifier, Наименование агентства-отправителя по ОКАТО. Настраиваемое пользователем?
      9: 'TCN-GUID', // TCN - Transaction control number, Уникальный номер транзакции. (Давать заполнить пользователяю / программно ?) Как генерировать ?
      //  10: '0000000000Z',           // TCR - Transaction control reference, Контрольный номер транзакции (ссылка на пред. запрос!)
      11: '00.00', // NSR - Native scanning resolution, Исходное разрешение сканирования ('19.68', если записей Type-3..Type-7 нет, пишем: '00.00'!)
      12: '00.00', // NTR - Nominal transmitting resolution, Номинальное разрешение передачи ('19.68', если записей Type-3..Type-7 нет, пишем: '00.00'!)
      13: [
        ['RUS-I', NIST_VER]
      ], // DOM - Domain name,
      14: getGMTString(currDate), // GMT - Greenwich mean time, Всемирное время в виде строки: YYYY MM DDD HH MM SS Z -> 20200630084318Z (15 символов, Дата выполнения экспорта карты?)
      15: [
        ['003', 'UTF-8', 'ru_RU.UTF-8']
      ], // DCS - Каталог наборов символов,
    }
  }
  //- Type 10, Фото лица и особых примет (Facial & SMT Image Data) ---------------
  if (photos && photos.length > 0) {
    nistObj[10] = await Promise.all(photos.map(async (image) => {
      const fileBuff = await fsp.readFile(image.filePath) // if (ex.code === 'ENOENT') ???
      const dimensions = sizeImage(fileBuff) // Exception!!!
      //    console.log('photo sizeImage: %O', dimensions) // Debug!!!        

      const imgWidth = String(dimensions.width)
      const imgHeight = String(dimensions.height)

      return {
        3: 'FACE', // IMT - Image Type, Тип изображения ('FACE', 'SCAR', 'MARK', 'TATTOO') Debug!!!
        4: config.nistOri, // SRC - Source agency, 10..21 символов с разделителями (28 byte max!)
        5: getDateString(image.date), // PHD - Photo capture data, Дата фотографии
        6: imgWidth, // HLL - Horizontal line length, Размер в пикселах по горизонтали
        7: imgHeight, // VLL - Vertical line length, Размер в пикселах по вертикали
        8: '1', // SLC - Scale units, Единицы масштаба (0 - масштаб не приводится, 1 - пикселов на дюйм, 2 - пикселов на сантиметр) // Получить из изображения ???
        9: '94', // HPS - Масштаб в пикселах по горизонтали // Получить из изображения ???
        10: '94', // VPS - Масштаб в пикселах по вертикали // Получить из изображения ???
        11: getNistCGA(image.mime), // CGA - Compression angorithm, Алгоритм сжатия ('NONE' - данные не сжаты) 
        12: 'YCC', // CSP - Color space, Цветовое пространство (Для JPEG -> 'SRGB', для обратной совместимости допустимы 'YCC' и 'RGB') Debug!!!
        //  13: '',            // SAP - Информация о получении изображения лица (Для 'FACE' необязательное поле!)
        20: getNistPOS(image.tag), // POS - Положение субъекта (Анфас - F, равый профиль (90 градусов) - R, Левый профиль (90 градусов) - L, Снятый под углом - A)
        21: '0', // POA - Угол смещения от положения анфас (только для поля POS = A, + поворот лица вправо, - поворот лица влево)
        999: fileBuff, // Photo image data, всегда последнее поле - 999! 
      }
    }))
  }
  //------------------------------------------------------------------------------    
  let rollingDate = new Date(card.createdAt) // Дата прокатки (исходно берём дату создания карты!)
  const nistObj14 = []
  const nistObj15 = []
  //------------------------------------------------------------------------------ 
  if (fprints && fprints.length > 0) {
    await Promise.all(fprints.map(async (image) => {
      // const fileBuff = await fsp.readFile(image.filePath) // if (ex.code === 'ENOENT') ???
      // const base64Data = image.img.split(',')[1];
      const fileBuff = Buffer.from(image.img, 'base64'); // if (ex.code === 'ENOENT') ???
      const dimensions = sizeImage(fileBuff) // Exception!!!     
      const imgWidth = String(dimensions.width)
      const imgHeight = String(dimensions.height)

      const scaleUnits = '1' // ???
      const hRes = '500' // ???
      const vRes = '500' // ???          

      const imageDate = new Date(image.date) // Дата приходит как строка!  
      rollingDate = imageDate > rollingDate ? imageDate : rollingDate; // Если дата изображения больше сохраняем её! 

      const imageTag = getAdisTag(image.tag)
      //- Type 14, Tenprint fingerprint Impressions (Variable-resolution) ------------
      if (imageTag.type === 14) {
        nistObj14.push({
          3: '1', // IMP - Impression type, Способ получения отпечатка (0 - Live-scan plain / 1 - Live-scan rolled) ???            
          4: config.nistOri, // SRC - Source agency, 10..21 символов с разделителями (28 byte max!)
          5: getDateString(image.date), // FCD - Fingerprint capture data, Дата ввода отпечатка следа в формате: YYYYMMDDD
          6: imgWidth, // HLL - Horizontal line length, Размер в пикселах по горизонтали
          7: imgHeight, // VLL - Vertical line length, Размер в пикселах по вертикали
          8: scaleUnits, // SLC - Scale units, Единицы масштаба (0 - масштаб не приводится, 1 - пикселов на дюйм, 2 - пикселов на сантиметр)            
          9: hRes, // HPS - Масштаб в пикселах по горизонтали
          10: vRes, // VPS - Масштаб в пикселах по вертикали
          11: 'WSQ20', // CGA - Compression angorithm,  Алгоритм сжатия ('NONE' - данные не сжаты) Пишем только в WSQ ???            
          12: '8', // BPX - Количество бит на пиксел (8 - для обычных значений шкалы яркости: от 0 до 255!)
          13: [String(imageTag.nist)], // FGP - Finger position, Номер пальца
          20: 'fpimg', // COM - Комментарий (произвольный?)
          999: fileBuff, // Fingerprint image data, всегда последнее поле - 999!
        })
        updateFingerMask(image.tag) // Добавляем изображение в маску!          
      }
      //- Type 15, -------------------------------------------------------------------
      if (imageTag.type === 15) {
        nistObj15.push({
          3: '10', // IMP - Impression type, Отпечаток ладони, полученный с помощью дактилоскопического сканера - 10 / Отпечаток ладони, полученный непрямым считыванием - 11           
          4: config.nistOri, // SRC - Source agency, 10..21 символов с разделителями (28 byte max!)
          5: getDateString(image.date), // PCD - Palm capture data, Дата ввода отпечатка следа в формате: YYYYMMDDD
          6: imgWidth, // HLL - Horizontal line length, Размер в пикселах по горизонтали
          7: imgHeight, // VLL - Vertical line length, Размер в пикселах по вертикали
          8: scaleUnits, // SLC - Scale units, Единицы масштаба (0 - масштаб не приводится, 1 - пикселов на дюйм, 2 - пикселов на сантиметр)            
          9: hRes, // HPS - Масштаб в пикселах по горизонтали
          10: vRes, // VPS - Масштаб в пикселах по вертикали
          11: 'WSQ20', // CGA - Compression angorithm,  Алгоритм сжатия ('NONE' - данные не сжаты) Пишем только в WSQ ???            
          12: '8', // BPX - Количество бит на пиксел (8 - для обычных значений шкалы яркости: от 0 до 255!)
          13: [String(imageTag.nist)], // PLP - Finger position, Номер положения ладони
          20: 'fpimg', // COM - Комментарий (произвольный?)
          999: fileBuff, // Fingerprint image data, всегда последнее поле - 999!
        })
        updateFingerMask(image.tag) // Добавляем изображение в маску!           
      }
    }))
  }
  //------------------------------------------------------------------------------
  if (nistObj14.length > 0) {
    nistObj[14] = nistObj14
  }
  if (nistObj15.length > 0) {
    nistObj[15] = nistObj15
  }
  //- Type 2, Текстовая информация -----------------------------------------------
  nistObj[2] = {
    3: NIST_VER, // SYS - System Information, Системная информация (поле содержит 4 байта, которые определяют версию спецификации Type-2)
    4: getDateString(card.createdAt), // DFC - Date of First Create, Начальная дата ввода данных в базу, в формате: YYYYMMDDD
    5: getDateString(card.changedAt), // DLU - Date of Last Update, Дата последнего обновления данных, в формате: YYYYMMDDD // Допускается многократное использование поля!
    7: String(card.id), // CNO - Case Number, Номер дактилокарты, карточки следа или другого документа // Что писать, внешнее поле ???
    19: getDateString(rollingDate), // DPR - Date Fingerprinted, Дата дактилоскопирования в формате: YYYYMMDDD // Дата самого нового изображения ???
    30: [nameArray], // Name - Nam, Состоит из трех подполей (Фамилия, Имя, Отчество)
    35: getDateString(card.dob), // DOB - Date of Birth, Дата рождения, в формате: YYYYMMDDD
    39: card.gender, // Sex (SEX), Пол, M – мужской, F – женский, U – неизвестен
    309: userName, // Оператор дактилоскопирования. Содержит фамилию лица, проводившего дактилоскопирование или другую подобную информацию (из логина оператор в базе ???)
    374: maskFingers.join(''), // Debug !!! '1111111111',                 // Маска состояния пальцев (0 - ампутирован; 1 - палец есть; Б - забинтован; Ш - на пальце установлен признак шрама)  Debug!!!
    375: maskFingers.join(''), // Маска наличия изображений пальцев (0 - изображения нет; 1 - изображение есть; Порядок перечисления - в порядке нумерации пальцев)
    376: maskPalms.join(''), // Маска наличия изображений ладоней 0/1 (Порядок перечисления: левая полная; левая верх; левая низ; левая ребро; правая полная; правая верх; правая низ; правая ребро.)
    377: maskControls.join(''), // Маска контрольных оттисков 0/1 (Порядок перечисления: левые четыре; левый большой; правый большой; правые четыре)
    378: [
      ['WebScan', appVersion, 'Papillon IT']
    ], // Полный номер версии ПО 
  }
  //- Получаем все поля соответствующие типу карты из обьекта карты в базе ------- 
  const fieldsError = []

  Object.keys(card).filter(key => key.startsWith('rusi_')).forEach(fieldName => { // Выделяем поля типа: "rusi_2_323"
    const fieldId = fieldName.split('_') // 0 - Prefix, 1 - Record type, 2 - Record num 
    if (fieldId.length === 3) {
      const recType = Number.parseInt(fieldId[1], 10)
      const recNum = Number.parseInt(fieldId[2], 10)

      if (!Number.isNaN(recType) && recType >= 1 && recType <= 2 && // 1..99 только Type 1/2 ??? 
        !Number.isNaN(recNum) && recNum >= 4 && recNum <= 998) {

        const val = card[fieldName] // Значение поля  && card[fieldName].trim() ??? Поля типа [['003', 'UTF-8', 'ru_RU.UTF-8']]    
        if (val) { // Пустые поля не записываем ???
          if (nistObj[recType]) { // Обьект данного типа записи уже существует!
            nistObj[recType][recNum] = val // Новое поле обьекта
          } else {
            nistObj[recType] = {
              recNum: val
            } // Новый обьект данного типа
          }
        }
        return // O.K!
      }
    }
    fieldsError.push(`Record ID format error: ${fieldName}`) // Error!       
    console.warn(`Record ID format error: ${fieldName}`) // Debug!!!
  })
  //------------------------------------------------------------------------------
  //console.log('Export nistObject: %O', nistObj) // Debug!!!
  if (fieldsError.length > 0) {
    throw new ServerError(`Processing custom card fields: ${fieldsError.join(', ')}`, 422, 'BAD_CUSTOM_FIELD') // Выходим с массивом ошибок!      
  }
  //------------------------------------------------------------------------------
  const encodeResult = nodeNist.nistEncode(nistObj, {}) // Options!!!
  if (encodeResult.tag !== 'success') {
    throw new ServerError(`Error generating NIST file: ${encodeResult.error}`, 422, 'ERROR_CREATING_NIST') // Выходим с ошибокой кодирования!     
  }
  return encodeResult.value
}
//------------------------------------------------------------------------------

//- Функция разбора и проверки набора файлов в запросе - 'imprint' -------------
function parseFileObject(filesObj, cardIDs) {
  //const modelInfo = JSON.parse(fileObj.fields.model[0]) // Доп. параметры формы
  //console.log('%s Cards parseFileObject, fileObj: %O', Date.now(), filesObj) // Debug!!! 
  //- Проверяем наличие и количество файлов описания областей --------------------
  const jsonFiles = filesObj.files && filesObj.files.jsonFiles
  if (!Array.isArray(jsonFiles) || jsonFiles.length !== cardIDs.length) {
    throw new ServerError('Incorrect size of jsonFiles array in query', 400, 'INCORRECT_NUM_FILES')
  }
  //- Проверяем наличие и количество файлов фона ---------------------------------      
  const pdfFiles = filesObj.files && filesObj.files.pdfFiles
  if (!Array.isArray(pdfFiles) || pdfFiles.length !== cardIDs.length) {
    throw new ServerError('Incorrect size of pdfFiles array in query', 400, 'INCORRECT_NUM_FILES')
  }
  //- Формируем выходной массив с именами файлов для каждой карты ----------------      
  return cardIDs.map((cardId, i) => {
    if (jsonFiles[i].type !== 'application/json') {
      throw new ServerError(`Incorrect file type, jsonFiles[${i}], ${jsonFiles[i].name}`, 400, 'BAD_FILE_TYPE')
    }
    if (pdfFiles[i].type !== 'application/pdf') {
      throw new ServerError(`Incorrect file type, pdfFiles[${i}], ${pdfFiles[i].name}`, 400, 'BAD_FILE_TYPE')
    }
    //- Возвращаем массив обьектов с именами файлов соответсвующими карте ----------      
    return {
      cardId,
      jsonFile: jsonFiles[i].name,
      pdfFile: pdfFiles[i].name,
    }
  })
}
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
module.exports = {
  getNistCard,
  function (Cards) {
  //- Функция отправки карты по SMTP ---------------------------------------------
  async function sendCard(config, cardName, cardPath, mimeType) {
    if (config.exportCardTo === 1) { // mail export!        
      return Cards.app.models.Email.send({
        to: config.mailTo,
        from: config.mailFrom,
        subject: cardName,
        text: `Export: ${cardName}`,
        attachments: [{ // filename and content type is derived from path                    
          filename: cardName,
          path: cardPath,
          contentType: mimeType, // nist -> application/octet-stream / json -> 'application/json'
        }] // Аналогично вложить файлы изображений ???                           
      })
    }
    return cardPath // cardPath что дальше делать ???       
  }
  //------------------------------------------------------------------------------

  //- Функция поиска записей о изображениях с заданным - cardId ------------------
  async function findImages(modelName, cardId) {
    const model = Cards.app.models[modelName] // photos / fprints                      
    if (!model) {
      throw new ServerError(`Unknown model name: ${modelName}`, 500, 'DB_STRUCTURE_ERROR')
    }
    if (!cardId) { // Карт с номером 0 быть не должно!      
      throw new ServerError(`Undefined model: ${modelName}, cardId: ${cardId}`, 'BAD_CARD_ID')
    }
    return model.find({
      where: {
        cardId
      }
    }) // Получаем список всех изображений для данной карты     
  }
  //------------------------------------------------------------------------------

  //- Функция поиска записей о пользователях с заданным - userId -----------------
  async function findUserName(userId) {
    let userName = ''
    try {
      const user = await Cards.app.models.users.findById(userId) // Получаем данные карты или null!  Если данный оператор удалён ??? !!!
      userName = user ? user.name : userName
    } catch (ex) {
      console.error(`Error receiving user data with ID: ${userId}`, ex)
    }
    return userName
  }
  //------------------------------------------------------------------------------

  //- Функция удаления каталога карты (со всем содержимым!) ----------------------
  async function delCardFolder(cardId) {
    if (!cardId) { // Карт с номером 0 быть не должно!
      throw new ServerError(`Undefined cardId: ${cardId}`, 'BAD_CARD_ID')
    }
    try {
      const name = `card-${cardId}`
      await Cards.app.models.container.destroyContainer(name)
    } catch (ex) {
      console.error('delCardFolder error:', ex) // Debug!!!
      if (ex.code !== 'ENOENT') { // Игнорируем ошибку - "no such file or directory"!
        throw ex // Обернуть в ServerError(ex, 500, ) ???
      }
    }
    return true
  }
  //------------------------------------------------------------------------------

  //- Функция удаления из базы набора изображений - images, модели - modelName ---
  async function delImages(modelName, images) {
    const model = Cards.app.models[modelName]
    if (!model) {
      throw new ServerError(`Unknown model name: ${modelName}`, 500, 'DB_STRUCTURE_ERROR')
    }
    return Promise.all(images.map((image) => model.destroyById(image.id)))
  }
  //------------------------------------------------------------------------------

  //------------------------------------------------------------------------------
  Cards.observe('before save', async (ctx) => {
    const token = ctx.options && ctx.options.accessToken
    const userId = token && token.userId // undefined ???
    const {
      data,
      isNewInstance = false
    } = ctx
    const {
      instance = data
    } = ctx
    //  console.log('%s Cards before save, isNewInstance: %s, instance: %O', Date.now(), isNewInstance, instance) // Debug!!!    
    //------------------------------------------------------------------------------
    if (isNewInstance) {
      instance.createdAt = new Date()
      if (userId !== undefined) instance.createdBy = userId // Сохраняем идентификатор создателя(владельца) карты!      
    } else {
      const keys = Object.keys(instance)
      if (keys.length === 1 && keys[0] === 'sendToBase') { // Сохранение при экспорте, дату изменения карты не трогаем!   
        //    console.log('%s Cards before save, export', Date.now()) // Debug!!!  
      } else {
        instance.changedAt = new Date()
        if (userId !== undefined) instance.changedBy = userId // Сохраняем идентификатор пользователя изменившего карту!   
      }
    }
  })
  //------------------------------------------------------------------------------
  /*
  //------------------------------------------------------------------------------
    Cards.observe('before delete', async (ctx) => {                              
      console.log('%s %s before delete, ctx: %O', Date.now(), ctx.Model.pluralModelName, ctx) // Debug!!!        
    }) 
  //------------------------------------------------------------------------------  
  */
  //------------------------------------------------------------------------------
  Cards.observe('after delete', async (ctx) => {
    try {
      const countDeleted = ctx.info && ctx.info.count // Число удалённых записей (карт)
      //    console.log('%s %s, after delete, count deleted: %d ctx.where: %O', Date.now(), ctx.Model.pluralModelName, countDeleted, ctx.where) // Debug!!!

      if (countDeleted) { // where: {"id":3} / where: {"or":[{"id":4},{"id":8}]}
        const cardIDs = getWhereIDs(ctx.where) // Получаем массив идентификаторов карт  
        if (countDeleted !== cardIDs.length) {
          console.error('%s Cards, after delete: Incorrect record IDs set: %O', Date.now(), ctx.where) // Debug???
          throw new ServerError('Incorrect record IDs set', 400, 'BAD_WHERE_PARAMETER') // Отображаются с клиенте как есть! `Incorrect record IDs set: ${ctx.where}`               
        }

        await Promise.all(cardIDs.map(async (cardId) => {
          const exportFiles = await findExportFiles(cardId) // При удалении карты удаляем все файлы экспорта карты?
          await delExportFiles(exportFiles)

          const photos = await findImages('photos', cardId)
          await delImages('photos', photos) // Удаляем все связанные с картой файлы фотографий

          const fprints = await findImages('fprints', cardId)
          await delImages('fprints', fprints) // Удаляем все связанные с картой файлы отпечатков 

          await delCardFolder(cardId) // Удаляем каталог карты // Рано вызывается, до удаления фото/отпечатков ??? 
        }))
      }
    } catch (ex) {
      throw (ex instanceof ServerError) ? ex : new ServerError(ex, 500, 'ERROR_DELETE_CARDS')
    }
  })
  //------------------------------------------------------------------------------

  //- Внешний метод экспорта карт (JSON / NIST) ---------------------------------- Возвращает массив идентификаторов экспортированных карт! 
  Cards.export = async (ctx, where) => {
    let cardIDs = []
    //  const userId = ctx.req.accessToken && ctx.req.accessToken.userId
    //  console.log('%s Cards export, userID: %s, query: %s, where: %O', Date.now(), userId, ctx.req.query, where) // Debug!!!
    try {
      if (where) {
        cardIDs = getWhereIDs(where) // Получаем массив идентификаторов // where: {"id":3} / where: {"or":[{"id":4},{"id":8}]}
        console.log('%s Cards export, cardIDs: %O', Date.now(), cardIDs) // Debug!!!  

        if (cardIDs.length === 0) {
          throw new ServerError('Missing object IDs in request', 400, 'NO_OBJECT_IDS') // ${ctx.where} ???            
        }
      } else {
        throw new ServerError('There is no parameter with object IDs in query', 400, 'NO_WHERE_PARAMETER')
      }
      //------------------------------------------------------------------------------
      return await Promise.all(cardIDs.map(async (cardId) => {
        const card = await Cards.findById(cardId) // Получаем данные карты или null!
        if (!card) {
          throw new ServerError(`Card with ID: ${cardId} not found`, 400, 'CARD_NOT_FOUND') // 404 ???
        }
        //      console.log('%s cardId: %d cardObj: %O', Date.now(), cardId, card) // Debug!!!         
        //- Формирование карты из записей в базе ---------------------------------------  
        const config = await Cards.app.readConfig() // Получаем текущую конфигурацию 
        const cardExt = (config.exportCardType === 0) ? 'json' : (config.exportCardType === 1) ? EXPORT_NIST_EXT : '' // Получаем расширение для файла карты 
        const cardName = newCardName(cardId, cardExt) // `card-${cardId}-${Date.now()}.${cardExt}`
        const cardPath = getFullPath(EXPORT_CONTAINER, cardName)
        let cardData
        //- Получаем все фото / отпечатки карты ----------------------------------------
        const photoImages = await findImages('photos', cardId)
        const fprintImages = await findImages('fprints', cardId)
        //------------------------------------------------------------------------------
        if (config.exportCardType === 0) { // ADIS card - 0  
          cardData = getAdisCard(card, photoImages, fprintImages)
        }
        //------------------------------------------------------------------------------
        if (config.exportCardType === 1) { // NIST card - 1
          const userName = await findUserName(card && card.createdBy) // Идентификатор оператора создавшего карту!
          const photoObjects = getPhotoObjects(photoImages)
          const fprintObjects = getFPrintObjects(fprintImages)
          cardData = await getNistCard(config, card, userName, Cards.app.version, photoObjects, fprintObjects)
        }
        //------------------------------------------------------------------------------        
        await writeFileCard(cardPath, cardData) // Exception! 
        await sendCard(config, cardName, cardPath, 'application/octet-stream') // Выбор типа экспорта! (почта т .д. ) 'application/json' ???               
        await card.updateAttribute('sendToBase', Date.now()) // Обновление карты - признак успешного экспорта!    
        return cardId
      }))
    } catch (ex) {
      throw (ex instanceof ServerError) ? ex : new ServerError(ex, 500, 'ERROR_CARDS_EXPORT')
    }
  }
  //------------------------------------------------------------------------------

  //- Функция создания новой записи в таблице печати -----------------------------
  async function createPrintsRecord(info) {
    //  console.log(`${Date.now()} Prints createRecord, fileInfo:`, info) // Debug!!!
    return Cards.app.models.Prints.create({ // Создаём запись о файле в таблице - prints
      resType: info.resType, // card / photo / fprint
      procType: info.procType, // print / imprint 
      resId: info.resId,
      //    status:    PRINT_STATUS.WAITING_PROCESSING, 
      createdBy: info.userId,

      jsonFile: info.jsonFile,
      pdfFile: info.pdfFile,

      fileName: info.fileName,
      fileType: info.fileType, // pdf - application/pdf, json - application/json, nist - application/octet-stream ???
      fileUrl: `/api/containers/${EXPORT_CONTAINER}/download/${changeFileExt(info.fileName, '.pdf')}`, // pdf ???   
    })
  }
  //------------------------------------------------------------------------------          

  //- Внешний метод печати карт (NIST -> Dactoprint() -> PDF) --------------------
  Cards.print = async (ctx, where) => {
    let cardIDs = []
    try {
      const userId = ctx.req.accessToken && ctx.req.accessToken.userId
      if (!userId) {
        throw new ServerError('No user ID in request', 401, 'NO_USER_ID')
      }
      //    console.log('%s Cards print, userID: %s, query: %s, where: %O', Date.now(), userId, ctx.req.query, where) // Debug!!!
      //------------------------------------------------------------------------------
      if (where) {
        cardIDs = getWhereIDs(where) // Получаем массив идентификаторов // where: {"id":3} / where: {"or":[{"id":4},{"id":8}]}
        //      console.log('%s Cards print, cardIDs: %O', Date.now(), cardIDs) // Debug!!!  
        if (cardIDs.length === 0) {
          throw new ServerError('Missing object IDs in request', 400, 'NO_OBJECT_IDS')
        }
      } else {
        throw new ServerError('There is no parameter with object IDs in query', 400, 'NO_WHERE_PARAMETER')
      }
      //- Возвращаем массив идентификаторов записей в таблице - prints --------------- // [ID1, ID2]  
      return await Promise.all(cardIDs.map(async (cardId) => {
        const card = await Cards.findById(cardId) // Получаем данные карты или null!
        if (!card) {
          throw new ServerError(`Card with ID: ${cardId} not found`, 400, 'CARD_NOT_FOUND') // 404 ???
        }
        //      console.log('%s cardId: %d cardObj: %O', Date.now(), cardId, card) // Debug!!!         
        //- Формирование карты из записей в базе ---------------------------------------  
        const config = await Cards.app.readConfig() // Получаем текущую конфигурацию   
        //- Получаем все фото / отпечатки карты ----------------------------------------
        const photoImages = await findImages('photos', cardId)
        const fprintImages = await findImages('fprints', cardId)
        //- NIST card (for Dactoprint!) ------------------------------------------------  
        const cardName = newCardName(cardId, EXPORT_NIST_EXT) // `card-${cardId}-${Date.now()}.${EXPORT_NIST_EXT}`
        const userName = await findUserName(card && card.createdBy) // Идентификатор оператора создавшего карту!
        const photoObjects = getPhotoObjects(photoImages)
        const fprintObjects = getFPrintObjects(fprintImages)
        const cardData = await getNistCard(config, card, userName, Cards.app.version, photoObjects, fprintObjects)
        //- ADIS card (for PDF!) -------------------------------------------------------
        //      const cardData = getAdisCard(card, photoImages, fprintImages)                       // Debug!!!
        //      const cardName = newCardName(cardId, 'json') // `card-${cardId}-${Date.now()}.json` // Debug!!!                             
        //------------------------------------------------------------------------------        
        const cardPath = getFullPath(EXPORT_CONTAINER, cardName)
        await writeFileCard(cardPath, cardData) // Exception! 
        const printObj = await createPrintsRecord({
          userId,
          resType: 'cards',
          resId: cardId,
          procType: 'print',
          fileName: cardName,
          fileType: 'application/pdf', // out file mime-type!
        })
        return printObj.id // Возвращаем идентификатор записи в таблице - prints! 
      }))
    } catch (ex) {
      throw (ex instanceof ServerError) ? ex : new ServerError(ex, 500, 'CARDS_PRINT_ERROR')
    }
  }
  //------------------------------------------------------------------------------

  //- Функция формирует и сохраняет карту АДИС в файле JSON ---------------------- 
  const exportCard2Json = async (cardId) => {
    const card = await Cards.findById(cardId) // Получаем данные карты или null !!!
    //  console.log('%s cardId: %d cardObj: %O', Date.now(), cardId, card) // Debug!!!          
    //- Получаем все фото / отпечатки карты ----------------------------------------
    const photoImages = await findImages('photos', cardId)
    const fprintImages = await findImages('fprints', cardId)
    //- ADIS card ------------------------------------------------------------------
    const cardData = getAdisCard(card, photoImages, fprintImages)
    const cardName = newCardName(cardId, 'json') // `card-${cardId}-${Date.now()}.json`            
    const cardPath = getFullPath(EXPORT_CONTAINER, cardName)
    //------------------------------------------------------------------------------        
    await writeFileCard(cardPath, cardData) // Exception! 
    return {
      cardName,
      cardPath
    }
  }
  //------------------------------------------------------------------------------ 

  //- Внешний метод печати с фоном карты и вставкой изображений (PDF -> PDF) -----
  Cards.imprint = async (ctx, where) => {
    let cardIDs = []
    try {
      const userId = ctx.req.accessToken && ctx.req.accessToken.userId
      if (!userId) {
        throw new ServerError('No user ID in request', 401, 'NO_USER_ID')
      }
      console.log('%s Cards imprint, userID: %s, query: %s, where: %O', Date.now(), userId, ctx.req.query, where) // Debug!!!
      //------------------------------------------------------------------------------
      if (where) {
        cardIDs = getWhereIDs(where) // Получаем массив идентификаторов // where: {"id":3} / where: {"or":[{"id":4},{"id":8}]}
        //      console.log('%s Cards imprint, cardIDs: %O', Date.now(), cardIDs) // Debug!!!  
        if (cardIDs.length === 0) {
          throw new ServerError('Missing object IDs in request', 400, 'NO_OBJECT_IDS')
        }
      } else {
        throw new ServerError('There is no parameter with object IDs in query', 400, 'NO_WHERE_PARAMETER')
      }
      //- Получаем файлы от клиента (фона + описания областей для каждой карты) ------
      const {
        container
      } = Cards.app.models
      await getCardContainer(container, EXPORT_CONTAINER)
      const filesObj = await container.upload(ctx.req, ctx.result, {
        container: EXPORT_CONTAINER
      }) // options ==> { container: cont_id }        
      let cardFiles
      //- Разбираем набор файлов запроса ---------------------------------------------
      try {
        cardFiles = parseFileObject(filesObj, cardIDs)
      } catch (ex) {
        //- При ошибке удаляем исходные файлы запроса ----------------------------------           
        try {
          const jsonFiles = filesObj.files && filesObj.files.jsonFiles
          let fnames = Array.isArray(jsonFiles) ? jsonFiles.map(file => file.name) : []

          const pdfFiles = filesObj.files && filesObj.files.pdfFiles
          fnames = Array.isArray(pdfFiles) ? [...fnames, ...pdfFiles.map(file => file.name)] : fnames

          await removeExportFiles(fnames)
        } catch (e) {
          console.error('Error deleting incomplete Cards.imprint request files:', e)
        }
        //- Пробрасываем исключение дальше ---------------------------------------------        
        throw (ex instanceof ServerError) ? ex : new ServerError(ex, 500, 'PARSE_FILES_ERROR')
      }
      //- Возвращаем массив идентификаторов записей в таблице - prints --------------- // [ID1, ID2]  
      return await Promise.all(cardFiles.map(async (cardFile) => {
        const {
          cardId,
          jsonFile,
          pdfFile
        } = cardFile
        let cardFileName
        try {
          const {
            cardName
          } = await exportCard2Json(cardId)
          cardFileName = cardName
          //------------------------------------------------------------------------------        
          const printObj = await createPrintsRecord({
            userId,
            resId: cardId,
            resType: 'cards',
            procType: 'imprint',
            jsonFile,
            pdfFile,
            fileName: cardName,
            fileType: 'application/pdf', // out file mime-type!
          })
          return printObj.id // Возвращаем идентификатор записи в таблице - prints! 
        } catch (ex) {
          await removeExportFiles([jsonFile, pdfFile, cardFileName])
          throw ex
        }
      }))
      //------------------------------------------------------------------------------    
    } catch (ex) {
      throw (ex instanceof ServerError) ? ex : new ServerError(ex, 500, 'CARDS_IMPRINT_ERROR')
    }
  }
  //------------------------------------------------------------------------------
  //
  //------------------------------------------------------------------------------
  Cards.remoteMethod('export', {
    description: 'Export a single card or a group of cards',
    accepts: [{
        arg: 'ctx',
        type: 'object',
        http: {
          source: 'context'
        }
      },
      {
        arg: 'where',
        type: 'object',
        required: true,
        http: {
          source: 'query'
        }
      },
    ],
    returns: {
      arg: 'info',
      type: 'object',
      root: true
    },
    http: {
      verb: 'post'
    }
  })
  //------------------------------------------------------------------------------
  //
  //------------------------------------------------------------------------------
  Cards.remoteMethod('print', {
    description: 'Print a single card or a group of cards',
    accepts: [{
        arg: 'ctx',
        type: 'object',
        http: {
          source: 'context'
        }
      },
      {
        arg: 'where',
        type: 'object',
        required: true,
        http: {
          source: 'query'
        }
      },
    ],
    returns: {
      arg: 'info',
      type: 'object',
      root: true
    },
    http: {
      verb: 'post'
    }
  })
  //------------------------------------------------------------------------------
  //  
  //------------------------------------------------------------------------------ 
  Cards.remoteMethod('imprint', {
    description: 'Inserting images in the finished blank card for printing',
    accepts: [{
        arg: 'ctx',
        type: 'object',
        http: {
          source: 'context'
        }
      },
      {
        arg: 'where',
        type: 'object',
        required: true,
        http: {
          source: 'query'
        }
      }, //  required: true ??? без where работать не будет!!!
      {
        arg: 'jsonFiles',
        type: 'file',
        http: {
          source: 'formData'
        }
      }, // required: true - не находит поле в body!!!
      {
        arg: 'pdfFiles',
        type: 'file',
        http: {
          source: 'formData'
        }
      }, // required: true - не находит поле в body!!! 
    ],
    returns: {
      arg: 'info',
      type: 'object',
      root: true
    },
    http: {
      verb: 'post'
    },
  })
  //------------------------------------------------------------------------------
}
}