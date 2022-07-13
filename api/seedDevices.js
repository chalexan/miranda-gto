const mongoose = require('mongoose');
const Device = require('./models/device');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const devicesBase = [
    {
        "nompos": "022.4500.1019",
        "name": "Лента клейкая липучка Hyperline Cabling Systems WASNR-5x16-BK B16мм x L5м PA s3мм черная",
        "mol": "Кострикова Анна Евгеньевна",
        "cost": "393,297",
        "meter": "шт",
        "count": 35,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "025.9000.0432",
        "name": "Сапоги рабочие резина р. 44 мужские",
        "mol": "Кострикова Анна Евгеньевна",
        "cost": 415,
        "meter": "пар",
        "count": 1,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "025.9000.0441",
        "name": "Сапоги рабочие резина р. 37 женские",
        "mol": "Кострикова Анна Евгеньевна",
        "cost": 415,
        "meter": "пар",
        "count": 1,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "025.9000.0535",
        "name": "Сапоги рабочие резиновые PVC с жестким подноском р. 41 универсальные",
        "mol": "Кострикова Анна Евгеньевна",
        "cost": "584,18",
        "meter": "пар",
        "count": 1,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "034.6440.0591",
        "name": "Удлинитель электрический Universal У10-554 3 розет. 10м с заземлением 10А 3x0.75мм2 220В",
        "mol": "Кострикова Анна Евгеньевна",
        "cost": 1,
        "meter": "шт",
        "count": 1,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "034.6888.0485",
        "name": "Устройство зарядное для аккумуляторов ANSMANN Energy 8 plus AA AAA C D 9V E",
        "mol": "Кострикова Анна Евгеньевна",
        "cost": 1,
        "meter": "шт",
        "count": 1,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "035.7800.7912",
        "name": "Кабель соединительный CAB-18-12 18х2 12м",
        "mol": "Кострикова Анна Евгеньевна",
        "cost": "1342,37",
        "meter": "шт",
        "count": 6,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "035.7800.8855",
        "name": "Кабель соединительный CAB-25-2 Eltex 25х2 6м",
        "mol": "Кострикова Анна Евгеньевна",
        "cost": "1006,78",
        "meter": "шт",
        "count": 2,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.7310.5688",
        "name": "Телефон сотовый смартфон Xiaomi Redmi Note 10 Pro 6.67\" 6Гбайт 128Гбайт",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "15832,5",
        "meter": "шт",
        "count": 10,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.7330.0739",
        "name": "Наушники AKG K 44",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": 1,
        "meter": "шт",
        "count": 3,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.7730.0127",
        "name": "Устройство грозозащиты Siklu EH-SRG для защиты оборудования телекоммуникационного",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "6042,75",
        "meter": "шт",
        "count": 1,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.8300.0296",
        "name": "Анализатор транспортных сетей EXFO MAX-890NGE для тестирования траснпортных сетей до 100G",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": 1,
        "meter": "шт",
        "count": 1,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.8300.0297",
        "name": "Анализатор спектра оптического EXFO FTBx-5245P платформы EXFO FTB-2, EXFO FTB-2 Pro, EXFO FTB-4 Pro, EXFO LTB-8",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": 1,
        "meter": "шт",
        "count": 1,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.8400.0068",
        "name": "Платформа оптическая измерительная с анализатором спектра, рефлектометром оптическим EXFO FTB-4x-PRO-FTBx-5245P-lпB-FTBx-735C-SM1",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": 1,
        "meter": "шт",
        "count": 1,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.9200.1631",
        "name": "Блок связи и управления System Control&Communication Board",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "5156,87",
        "meter": "шт",
        "count": 1,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.9200.2186",
        "name": "Плата мультиплексора 4Е1-1GE-FO",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "13514,55",
        "meter": "шт",
        "count": 2,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.9200.2287",
        "name": "Блок вентиляторный Fan Unit MODBOX III",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "533,47",
        "meter": "шт",
        "count": 2,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.9200.A091",
        "name": "Коннектор неэкранированный RJ45 8P8C cat.5e",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "2,808333",
        "meter": "шт",
        "count": 400,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.9300.0351",
        "name": "Полка приборная 19'' 2U",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "889,12",
        "meter": "шт",
        "count": 1,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.9300.0488",
        "name": "Шасси для 16-ти конвертеров D-Link DMC-1000",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "7095,14",
        "meter": "шт",
        "count": 2,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "066.9300.0638",
        "name": "Шасси DMC-1000 для конвертеров",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "5210,21",
        "meter": "шт",
        "count": 2,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "073.9930.0268",
        "name": "Сейф мебельный Cobalt EK-40",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": 1,
        "meter": "шт",
        "count": 1,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "081.2200.0159",
        "name": "Система страховочная GOBLIN с оттяжкой 26см",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": 9990,
        "meter": "шт",
        "count": 2,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "081.7000.0098",
        "name": "Ковер резиновый Pin mat 0.8x1.2м",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": 1,
        "meter": "шт",
        "count": 2,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "082.0000.0128",
        "name": "Полотенце 500x700мм лен 50%",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": 1,
        "meter": "шт",
        "count": 3,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "085.7000.0449",
        "name": "Костюм рабочий мужской на утепляющей подкладке (куртка + брюки) с логотипом р.48-50 170-176",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "3220,34",
        "meter": "шт",
        "count": 2,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "085.7000.0899",
        "name": "Рукавицы рабочие х/б с брезентовым наладонником",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "27,118",
        "meter": "пар",
        "count": 5,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "085.7000.0899",
        "name": "Рукавицы рабочие х/б с брезентовым наладонником",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "27,119",
        "meter": "пар",
        "count": 10,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "085.7000.0899",
        "name": "Рукавицы рабочие х/б с брезентовым наладонником",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": "27,1185",
        "meter": "пар",
        "count": 20,
        "category": "",
        "description": "",
        "provider": ""
    },
    {
        "nompos": "085.7000.1565",
        "name": "Плащ прорезиненный непромокаемый р.48-50 182-188",
        "mol": "Некрасов Дмитрий Юрьевич",
        "cost": 625,
        "meter": "шт",
        "count": 5,
        "category": "",
        "description": "",
        "provider": ""
    },
]

const dbPath = 'mongodb+srv://c:p@cluster0.qju1t.mongodb.net/?retryWrites=true&w=majority';

const connect = () => {
    mongoose.connect(dbPath, options)
        .then(() => console.log('Connected to DB'))
        .catch((err) => console.log(err))
}

connect();

console.log(devicesBase)
async function seed() {
    await Device.remove();
    await Device.create(devicesBase
    )
    console.log("seed completed!")
    mongoose.connection.close()
};

seed()
