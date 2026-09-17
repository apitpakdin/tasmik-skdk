// ================================================================
//  SISTEM TASMIK SK DATIN KHADIJAH
//  Google Apps Script Backend — Versi Bersih 2.0
//  Admin: g-29307946@moe-dl.edu.my
// ================================================================
//
//  CARA PASANG (BARU):
//  1. Buka Google Sheets BARU
//  2. Extensions → Apps Script → padam semua → tampal kod ini
//  3. Jalankan: setupSheets (sekali sahaja)
//  4. Jalankan: resetMuridSekarang (isi 162 murid)
//  5. Deploy → New Deployment → Web App
//     Execute as: Me | Who has access: Anyone
//  6. Copy URL → tampal dalam apps
// ================================================================

const ADMIN_EMAIL    = 'g-29307946@moe-dl.edu.my';
const SEKOLAH        = 'SK DATIN KHADIJAH';
const SPREADSHEET_ID = '1ISuJT8J8JxTJsk0cZdg7_fFvIzFq-b3QLK33eX0I-UI';

const SH = {
  GURU   : 'Guru',
  MURID  : 'Murid',
  REKOD  : 'Rekod',
  KHATAM : 'Khatam',
  KBS    : 'KBS',
  LOG    : 'Log',
  CONFIG : 'Config',
};

const IQRA_BARU = {
  'Iqra 1':{dari:3,ke:34,jilid:'Jilid 1'},
  'Iqra 2':{dari:37,ke:66,jilid:'Jilid 1'},
  'Iqra 3':{dari:69,ke:98,jilid:'Jilid 1'},
  'Iqra 4':{dari:101,ke:130,jilid:'Jilid 1'},
  'Iqra 5':{dari:3,ke:32,jilid:'Jilid 2'},
  'Iqra 6':{dari:35,ke:67,jilid:'Jilid 2'},
};

const IQRA_LAMA = {
  'Iqra 1':{dari:1,ke:32},'Iqra 2':{dari:1,ke:30},
  'Iqra 3':{dari:1,ke:30},'Iqra 4':{dari:1,ke:30},
  'Iqra 5':{dari:1,ke:30},'Iqra 6':{dari:1,ke:31},
};

const JS_MUKA = {1:1,2:21,3:41,4:61,5:81,6:101,7:121,8:141,9:161,10:181,
  11:201,12:221,13:241,14:261,15:281,16:301,17:321,18:341,19:361,20:381,
  21:401,22:421,23:441,24:461,25:481,26:501,27:521,28:541,29:561,30:581};

const GURU_SKDK = [
  {id:'GS001',nama:'HIDAYATUN NAJAH BINTI MOHD MASHUTI',singkat:'Hidayatun Najah',
   kelas:[{darjah:'Darjah 1',kelas:'Jauhari'},{darjah:'Darjah 6',kelas:'Jauhari'}]},
  {id:'GS002',nama:'FUZI BINTI MAT ROBI',singkat:'Fuzi Mat Robi',
   kelas:[{darjah:'Darjah 1',kelas:'Jauhari'},{darjah:'Darjah 6',kelas:'Jauhari'}]},
  {id:'GS003',nama:'RUHAYA BINTI IBRAHIM',singkat:'Ruhaya Ibrahim',
   kelas:[{darjah:'Darjah 2',kelas:'Jauhari'},{darjah:'Darjah 5',kelas:'Jauhari'}]},
  {id:'GS004',nama:'MUHAMMAD ADAM AIMAN BIN ABAS',singkat:'Adam Aiman',
   kelas:[{darjah:'Darjah 2',kelas:'Jauhari'},{darjah:'Darjah 4',kelas:'Jauhari'}]},
  {id:'GS005',nama:'NIK KHADIJAH BINTI NIK MAHMUD',singkat:'Nik Khadijah',
   kelas:[{darjah:'Darjah 3',kelas:'Jauhari'}]},
  {id:'GS006',nama:'NORIMAH BINTI ABD KADIR',singkat:'Norimah Abd Kadir',
   kelas:[{darjah:'Darjah 3',kelas:'Jauhari'}]},
  {id:'GS007',nama:'MUHAMMAD HAFIZUDDIN BIN YUSOF',singkat:'Hafizuddin Yusof',
   kelas:[{darjah:'Darjah 4',kelas:'Jauhari'}]},
  {id:'GS008',nama:'MOHD JANNATUN NAIM BIN HASSAN',singkat:'Jannatun Naim',
   kelas:[{darjah:'Darjah 5',kelas:'Jauhari'}]},
  {id:'GS009',nama:'WAN HAJAR BINTI KHAIRUDDIN',singkat:'Wan Hajar',
   kelas:[{darjah:'Darjah 5',kelas:'Jauhari'}]}];

const MURID_SKDK = {
  "1J":{darjah:"Darjah 1",kelas:"Jauhari",murid:[
    "AMIN NUR QHAUSSAR IMAN BINTI MASROL AZMIN","CHE ARISYA DAMIA BINTI ABDUL RAZZAQ","MARYAM DARLEENA BINTI MOHAMAD IZZUDDIN",
    "NABILA BINTI WASIM ABDULHAKIM SALEH HASAN","NAURAH SYIFAA BINTI AHMAD HAFIS",
    "NOOR ALIESYA NATASHA BINTI ABDULLAH","NUR AIN NAJIHAH",
    "NUR AIN NATASYA BINTI ABDUL QAYYUUM","NUR ALISHA AMANDA BINTI ABDUL RAZZAQ",
    "NUR AYUNI FATONAH BINTI SIRAT HELMI ATTARIQ","NUR ISHAMINA FARZANA BINTI MUHAMMAD HAFIZ",
    "NUR KHADIJAH HAURA BINTI MOHAMMAD KHAIRUL BASYAR","NUR MIKYLA BINTI MOHAMAD SHAHRULNIZAM",
    "NUR SAMAIRA FARISYA BINTI MUHAMMAD HAFIQ","NUR SUMAYYAH BINTI MOHD RUWAIDI",
    "NUR WAJIHAH ATIKAH BINTI MOHD RIDZUAN","NURUL AMANI FATEEMA BINTI MOHAMAD FIRDHAUS",
    "NURUL AINUL MARDHIAH BALQISYA BINTI MUHAMAD ZUHAIR","RABBIATULAL ADAWIYAH BINTI MUHAMAD AZRIL",
    "RAJA ELEENA SOFEA BINTI RAJA ABDULLAH TAWFEEQ","RAJA KUNTUM MAWAR MUNIRAH BINTI RAJA NAZRIN SHAH",
    "RAUDHATUL JANNAH BINTI AHMAD FADZIL","WAN DHIA RAISYA BINTI MIOR MOHAMMAD AZFAR"
  ]},
  "2J":{darjah:"Darjah 2",kelas:"Jauhari",murid:[
    "AAIRA MARYAM BINTI SYAHIR","AISYAH HUMAIRA BINTI MOHAMAD JEBAT",
    "ANIS HAMANI BINTI MOHD YUSOF","AUFA MARDHIYAH BINTI MUHAMMAD SYAFIQ",
    "DHALIA ANGGUN BINTI ROSHAFEEZ",
    "MARISSA MAYAZARA BINTI MUHAMAD SHAH RULMUNIR","MARYAM AAFIYAH BINTI MOHD FAZLI",
    "NOR ATHILA BINTI MOHD KHAIRANI","NUR AFEEYA NAYLAA BINTI MUHAMMAD AFIF HAFIZIN",
    "NUR ALYSSA HUMAYRA BINTI SA'AIDIN","NUR ARIANA SUMAYYAH BINTI MOHAMED AMIR",
    "NUR HAFIYA ZARA BINTI MOHD YAZID","NUR SALSABILLA PUTRI AZRIAN BINTI AZIZUL",
    "NURUL ANISA BINTI BANI HASHIM","NURUL IMAN ALISHA BINTI MOHAMMAD HAFIZ",
    "NURUL IMAN ALLEYSHA BINTI MOHAMMAD HAFIZ","NURUL ZAHIRAH BINTI ZAMZUHAREMY",
    "QAIREEEN BATRISYA BINTI ABDUL MUKMIN","SHARIFAH MARYAM BINTI SYED MUHAMMAD HAZWAN",
    "TEH SAFIYA DHUHA BINTI MOHD ZAINI","ZARIN ASYIFA BINTI ZAMER AIZAT"
  ]},
  "3J":{darjah:"Darjah 3",kelas:"Jauhari",murid:[
    "AMIN NUR QHADEEJA IMAN BINTI MASROL AZMIN","AMNI SYUHADA' BINTI HISHAM","DHIA NUR AISYAH BINTI AHMAD KADAFI",
    "DHIYA AFRINA IMANI BINTI MOHD AZHAM",
    "NAJLA BINTI MUHSIN","NOOR UMAIRAH BINTI MOHAMAD TAUFIK",
    "NUR AFRA NAYLA BINTI MOHAMMAD AMIRUL SHAH","NUR AISY QALESYA BINTI MOHD SHAIFULLAH",
    "NUR AMMARA BATRISYA BINTI MOHD NAZIF","NUR EYRAHANNA LUTFIYA BINTI MOHD RASHIDI",
    "NUR HANNAH IZZARA BINTI MOHD HAMIZAN","NUR KAYSHA HUMAIRAH BINTI MOHAMMAD KHAIRUL BASYAR",
    "NUR QHAIRA HASYA BINTI SHAHRIL AZRIN","NUR SUFI AWLIYA BINTI NORAZLI",
    "NUR SYAHMINA BINTI AHMAD AKMAL","NUR WARDAH BINTI AINUDDIN AZAM",
    "NURUL AMANI FAQIHAH BINTI MOHAMAD FIRDHAUS","NURUL ANNASYA BATRISYIA BINTI SUHAIMI",
    "PUTERI ILYANA KHALISYA BINTI AHMAD RAFIUDDIN SAFWAN","RAJA TEH QALEESYA BINTI RAJA ABDULLAH TAWFEEQ",
    "SITI ATILIA","UMMI UFAIRAH BINTI KHAIRUL AZUAN"
  ]},
  "4J":{darjah:"Darjah 4",kelas:"Jauhari",murid:[
    "ADIRA FAIHA BINTI ZULKEFLI","DAMIA QAISARA BINTI ZUHAIRI",
    "DHIA AMINAH BINTI ROSHAFEEZ","FITIYA NUR ISLAM BINTI MUHAMMAD ZAINUDIN",
    "NOR ALIAH NATASYAH BINTI MOHAMAD NOOR RASHDAN","NOR SHAH AYRA VARISHA BINTI ABDUL RAZAK",
    "NOR ZAFIRA HARISSYA BINTI ZAINAL ABIDIN","NUR AILEEN SOFEA BINTI MOHAMAD AINUDIN",
    "NUR ADIRA AZZAHRA BINTI MOHAMED IQRAM","NUR ALIESYA AISHAH BINTI MOHD PAZAL",
    "NUR AULIA IZZATUNNISA BINTI NORHISHAM","NUR FAQIHAH BINTI SULAIMAN",
    "NUR DAYANA BINTI RIDZUAN","NUR HAFIQA BINTI SARI BUDIN",
    "NUR IZZATUL ANISAH BINTI MUHAMMAD SHAFUAN NAIM","NUR LIYA ILYANA SHAHOMAR BINTI ABDUL HAFIZ",
    "NUR LIYA QISMINA SHAHOMAR BINTI ABDUL HAFIZ","NUR SUMAYYAH BINTI SAZUAN",
    "NUR SYAWAL SYAFIYA BINTI MOHD YAHAYA","NUR WAHIDAH SYAFIQAH BINTI MOHD RIDZUAN",
    "NUR ZHARA AISYAH BINTI JOEFENDI","NURIN NABILAH BINTI MOHD FADHIL",
    "NURUL AISYAH SARU BINTI ABDULLAH","NURUL FALISHA LIYANA BINTI MOHD SOFFIAN",
    "SITI NURUL AIN BINTI MOHD AZARIL AZWAD","WAN NURALYA UFAIRAH BINTI WAN KHAIRUL ARIFFIN",
    "ZURUL AIERA DAHLEEA BINTI ZURUL NA'IM"
  ]},
  "5J":{darjah:"Darjah 5",kelas:"Jauhari",murid:[
    "AISYAH BINTI MOHD NUR","ANINDITA QAISYA ZAHRA BINTI RIO HERMANTO",
    "ARISSA AUNI AQILAH BINTI KHAIRUL FAZLI","AUNI NABIHAH BINTI AZHAR",
    "AYU RAUDHAH BINTI SYAFIE","CHE NUR HAYATI BINTI CHE MASURIZAL",
    "EILFYNA HAADIRA BINTI MOHD HADZWAN",
    "INTAN NURHIDAYU BINTI ROSLI AMIR","JUZAILAH ZAHIDAH NABEELA BINTI MOHD JUZAILI HAFIZZULLAH",
    "KHAIRUL HUMAIRA BINTI ZAINUDDIN","NOOR SYALIHATUNNISA AMANI BINTI SYIRAZI",
    "NOR SYAKIRAH LIYANA BINTI MOHAMAD NAJIB","NUHA BINTI MUHSIN",
    "NUR ADRIANA QALYSHA BINTI ABDUL RAHIM","NUR AIN NASUHA",
    "NUR AINA DELISHA BINTI MOHD ZULFADLI","NUR AIRA FAIQA BINTI ZULKIFLI",
    "NUR AIRIS KEISHA BINTI AFIZAL","NUR ALISHA NAFISAH BINTI ABDULLAH",
    "NUR FATIMAH ZAHRA BINTI MOHD AMIR HASBUDIN","NUR HADFINA INSYIRAH BINTI MOHD HAMIZAN",
    "NUR HUSNA IMANI BINTI MOHD AZRIN","NUR QASEH HANNY BINTI ALIFUDDIN",
    "NUR SYAKILA BINTI ABDULLAH","NURALISYA UMAIRA BINTI ABDUL RAZAK",
    "PUTERI NUR SAIDATUL NAFISAH BINTI MEGAT KHARUL REDHUAN","PUTERI NURDINI ADAWIAH BINTI KHAIRUL AZUAN",
    "RABIATUL ADAWIYAH BINTI MIOR FIRDAUS","RABIATUL AINAA BINTI RAZMAN","SHARIFAH AUFA AL ZAWAWI BINTI SYED AHMAD ORAIF",
    "SYAZATUL AIN NUHA BINTI SYAHRUL AZMI","UMMI MAISARAH BINTI KHAIRUL AZUAN",
    "ZARIN ALESYA BINTI ZAMER AIZAT"
  ]},
  "6J":{darjah:"Darjah 6",kelas:"Jauhari",murid:[
    "ADLIN SOFEA BINTI MUHAMMAD KHIDIR","AINA QAISARA BINTI AHMAD SHAHRUDIN",
    "ALISHA SAFIYA BINTI AZIM",
    "NOR WARDAH AFIQAH BINTI MOHD RIDZUAN","NUR ALESYA AMANI BINTI MOHAMAD AINUDIN",
    "NUR AFRINA DAMIA BINTI MOHD RIDZUAN","NUR ALIYA HUSNINA BINTI MOHD RAZIF",
    "NUR ALYA BATRISYA BINTI MOHD FAIZAL","NUR ANIS NAZIHAH BINTI ROSMAN",
    "NUR ARIANA MAISARAH BINTI ABDULLAH","NUR EYRADANIA MELISSA BINTI MOHD RASHIDI",
    "NUR FAQIHAH AMANDA BINTI MOHD FAHMI","NUR IZZATUL HUMAYRA BINTI MOHD AZREEN",
    "NUR ZAFIRAH HANIS BINTI MOHD NAZIF","NUR ZAHRA IRDINA BINTI ABU MOHD HANIFAH",
    "NUR ZULAIKHA BINTI ABDUL QAYYUUM","NURUL SUHADA BINTI ABDULLAH",
    "QAIREEEN ARYANA BINTI MOHD IMRAN","QISTINA BALQIS BINTI ABDUL MUKMIN",
    "SHAYMA' AFFI' IE BINTI MOHD SHUKRI","SITI NURFARISYA BINTI KAMARUZZAMAN",
    "SYARIFAH NUR SARAH BINTI SYED NORWAHISYAM","UMAIRAH HAZIQAH BINTI MOHD AZIZI",
    "WAN DHIA SAFIYYAH BINTI WAN KHAIRUL ARIFFIN","ZARRA DAMIA BINTI DAMANHURI"
  ]}
};

// ================================================================
//  HELPER — Spreadsheet & Sheet
// ================================================================
function _ss() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function _getSheet(name) {
  const sheet = _ss().getSheetByName(name);
  if (!sheet) throw new Error('Sheet "' + name + '" tidak dijumpai');
  return sheet;
}

function _genId(pfx) {
  return pfx + new Date().getTime().toString().slice(-8) +
    Math.random().toString(36).slice(2,5).toUpperCase();
}

function _hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return String(Math.abs(h));
}

function _jsonResp(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function _log(tindakan, oleh, detail) {
  try {
    _getSheet(SH.LOG).appendRow([
      new Date().toISOString(), tindakan, oleh||'', detail||''
    ]);
  } catch(e) {}
}

function _sheetToJson(sheetName, keys) {
  const sheet = _getSheet(sheetName);
  if (sheet.getLastRow() < 2) return [];
  const data = sheet.getRange(2,1,sheet.getLastRow()-1,keys.length).getValues();
  return data.filter(r=>r[0]).map(row=>{
    const obj={};
    keys.forEach((k,i)=>{ if(k) obj[k]=row[i]; });
    return obj;
  });
}

function _getJuzuk(muka) {
  let j = 1;
  for (let n = 30; n >= 1; n--) {
    if (muka >= JS_MUKA[n]) { j = n; break; }
  }
  return j;
}

// ================================================================
//  WEB APP ENTRY
// ================================================================
function doGet(e) {
  return _jsonResp({status:'Tasmik API aktif', sekolah: SEKOLAH});
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;
    let result;
    switch(action) {
      case 'login'      : result = apiLogin(body);      break;
      case 'getAll'     : result = apiGetAll(body);     break;
      case 'addRekod'   :
        _log('DEBUG addRekod masuk', body.rekod?.muridNama||'?', 'dari='+body.rekod?.dari+' ke='+body.rekod?.ke);
        result = apiAddRekod(body);
        _log('DEBUG addRekod result', result.ok?'OK':'GAGAL', result.id||result.msg||'');
        break;
      case 'addKhatam'  : result = apiAddKhatam(body);  break;
      case 'addMurid'   : result = apiAddMurid(body);   break;
      case 'editMurid'  : result = apiEditMurid(body);  break;
      case 'addGuru'    : result = apiAddGuru(body);    break;
      case 'editGuru'   : result = apiEditGuru(body);   break;
      case 'resetMurid' : result = apiResetMurid();     break;
      case 'dedupMurid' : result = apiDedupMurid();     break;
      case 'changePass' : result = apiChangePass(body); break;
      case 'tukarTahun' : result = apiTukarTahun(body); break;
      case 'setKBS'     : result = apiSetKBS(body);     break;
      default: result = {ok:false, msg:'Action tidak dikenali: '+action};
    }
    return _jsonResp(result);
  } catch(err) {
    _log('ERROR doPost', '', err.message);
    return _jsonResp({ok:false, msg:'Server error: '+err.message});
  }
}

// ================================================================
//  AUTH
// ================================================================
function apiLogin(body) {
  const {username, password} = body;

  // Semak admin hardcoded dulu — paling selamat
  if ((username||'').toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    if (password === 'admin@SKDK2025') {
      return {ok:true, user:{
        id:'G0001', nama:'Admin SK Datin Khadijah',
        email:ADMIN_EMAIL, peranan:'admin', darjah:'', kelas:''
      }};
    }
    // Semak dalam sheet juga
    try {
      const sheet = _getSheet(SH.GURU);
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][2]||'').toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          if (data[i][3] === _hash(password) || data[i][3] === password) {
            return {ok:true, user:{
              id:data[i][0], nama:data[i][1], email:data[i][2],
              peranan:'admin', darjah:'', kelas:''
            }};
          }
        }
      }
    } catch(e) {}
    return {ok:false, msg:'Kata laluan admin tidak betul.'};
  }

  // Semak guru SKDK (login tanpa password — by ID sahaja)
  const guru = GURU_SKDK.find(g =>
    g.id.toLowerCase() === (username||'').toLowerCase()
  );
  if (guru) {
    return {ok:true, user:{
      id:guru.id, nama:guru.nama, email:guru.id.toLowerCase(),
      peranan:'guru',
      darjah:guru.kelas[0].darjah,
      kelas:guru.kelas[0].kelas
    }};
  }

  // Semak dalam sheet Guru
  try {
    const sheet = _getSheet(SH.GURU);
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const match = String(row[2]||'').toLowerCase() === (username||'').toLowerCase();
      if (match) {
        if (!password || row[3] === _hash(password) || row[3] === password || row[3] === '') {
          return {ok:true, user:{
            id:row[0], nama:row[1], email:row[2],
            peranan:row[4]||'guru', darjah:row[5]||'', kelas:row[6]||''
          }};
        }
        return {ok:false, msg:'Kata laluan tidak betul.'};
      }
    }
  } catch(e) {}

  return {ok:false, msg:'Pengguna tidak dijumpai.'};
}

// ================================================================
//  GET ALL DATA
// ================================================================
function apiGetAll(body) {
  try {
    const murid = _sheetToJson(SH.MURID,
      ['id','nama','no','darjah','kelas','guruId','jenis','peringkat',
       'iqraLabel','mukaSurat','bilKhatam','status','tarihDaftar','tarihKemaskini']
    ).filter(m => m.status !== 'Padam');

    const rekod = _sheetToJson(SH.REKOD,
      ['id','tarikh','hari','masa','muridId','muridNama','darjah','kelas',
       'guruId','guru','jenis','peringkat','iqraLabel','dari','ke','jumlah',
       'kualiti','catatan']
    );

    const khatam = _sheetToJson(SH.KHATAM,
      ['id','muridId','muridNama','darjah','kelas','bilangan','tahun',
       'tarikh','guru','catatan']
    );

    // Baca KBS secara berasingan — kalau sheet KBS belum dicipta (setupSheets
    // belum dijalankan semula), jangan biar seluruh getAll gagal
    let kbs = [];
    try {
      kbs = _sheetToJson(SH.KBS,
        ['id','muridId','muridNama','darjah','kelas','tahap','tahun',
         'sectionKey','itemId','itemTeks','status','guru','tarikh']
      );
    } catch(eKbs) {}

    const guru = _sheetToJson(SH.GURU,
      ['id','nama','email','password','peranan','darjah','kelas','status']
    ).filter(g => g.status !== 'Tamat')
     .map(g => ({...g, password:undefined}));

    // Tambah guru SKDK yang belum ada
    GURU_SKDK.forEach(gs => {
      if (!guru.find(g => g.id === gs.id)) {
        gs.kelas.forEach(kl => {
          guru.push({
            id: gs.id, nama: gs.nama, email: gs.id.toLowerCase(),
            peranan: 'guru', darjah: kl.darjah, kelas: kl.kelas, status: 'Aktif'
          });
        });
      }
    });

    return {ok:true, data:{murid, rekod, khatam, kbs, guru,
      config:{namaSekolah:SEKOLAH, alertDays:7}
    }};
  } catch(e) {
    return {ok:false, msg:'getAll error: '+e.message};
  }
}

// ================================================================
//  KEM BESTARI SOLAT (KBS)
// ================================================================
function apiSetKBS(body) {
  const {kbs} = body;
  if (!kbs || !kbs.muridId || !kbs.itemId) {
    return {ok:false, msg:'Data KBS tidak lengkap'};
  }

  try {
    const sheet = _getSheet(SH.KBS);
    const data = sheet.getDataRange().getValues();

    // Cari baris sedia ada — padan muridId + tahun + itemId (upsert)
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === kbs.muridId &&
          Number(data[i][6]) === Number(kbs.tahun) &&
          data[i][8] === kbs.itemId) {
        sheet.getRange(i+1, 11).setValue(kbs.status || '');
        sheet.getRange(i+1, 12).setValue(kbs.guru || '');
        sheet.getRange(i+1, 13).setValue(kbs.tarikh || new Date().toISOString());
        return {ok:true, id:data[i][0]};
      }
    }

    const id = kbs.id || _genId('KBS');
    sheet.appendRow([
      id, kbs.muridId, kbs.muridNama || '', kbs.darjah || '', kbs.kelas || '',
      kbs.tahap || '', kbs.tahun || new Date().getFullYear(),
      kbs.sectionKey || '', kbs.itemId, kbs.itemTeks || '',
      kbs.status || '', kbs.guru || '', kbs.tarikh || new Date().toISOString()
    ]);
    return {ok:true, id};
  } catch(e) {
    return {ok:false, msg:'Gagal simpan KBS: '+e.message};
  }
}

// ================================================================
//  REKOD BACAAN
// ================================================================
function apiAddRekod(body) {
  const {rekod} = body;
  if (!rekod || !rekod.muridNama) {
    return {ok:false, msg:'Data rekod tidak lengkap'};
  }

  try {
    const sheet = _getSheet(SH.REKOD);
    const id = _genId('R');
    const now = new Date();
    const days = ['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'];
    const pad = n => String(n).padStart(2,'0');

    let iqraLabel = rekod.iqraLabel || '';
    if ((rekod.peringkat === 'Al-Quran' || rekod.jenis === 'Al-Quran') && rekod.dari && rekod.ke) {
      const jD = _getJuzuk(parseInt(rekod.dari));
      const jK = _getJuzuk(parseInt(rekod.ke));
      iqraLabel = jD === jK ? 'Al-Quran (Juzuk '+jD+')' : 'Al-Quran (Juzuk '+jD+'-'+jK+')';
    }

    sheet.appendRow([
      id,
      rekod.tarikh || now.toISOString(),
      days[now.getDay()],
      pad(now.getHours())+':'+pad(now.getMinutes()),
      rekod.muridId||'', rekod.muridNama,
      rekod.darjah||'', rekod.kelas||'',
      rekod.guruId||'', rekod.guru||'',
      rekod.jenis||'', rekod.peringkat||'', iqraLabel,
      parseInt(rekod.dari)||0, parseInt(rekod.ke)||0, parseInt(rekod.jumlah)||0,
      rekod.kualiti||'', rekod.catatan||''
    ]);

    // Kemaskini peringkat murid dalam sheet Murid
    if (rekod.kemaskini || rekod.naikPeringkat) {
      try { _kemaskinMurid(rekod); } catch(em) {}
    }

    _log('Rekod', rekod.muridNama, rekod.peringkat+' m/s '+rekod.dari+'-'+rekod.ke);
    return {ok:true, id};

  } catch(e) {
    _log('ERROR Rekod', rekod.muridNama||'?', e.message);
    return {ok:false, msg:'Gagal simpan rekod: '+e.message};
  }
}

function _kemaskinMurid(rekod) {
  const sheet = _getSheet(SH.MURID);
  const data = sheet.getDataRange().getValues();
  const ORDER = ['Iqra 1','Iqra 2','Iqra 3','Iqra 4','Iqra 5','Iqra 6','Al-Quran','Khatam'];

  // Cari murid — by ID dulu, kemudian by nama+darjah+kelas
  let row = -1;
  const namaCari = String(rekod.muridNama||'').trim().toUpperCase();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === rekod.muridId) { row = i; break; }
    if (row < 0 && String(data[i][1]||'').trim().toUpperCase() === namaCari &&
        data[i][3] === rekod.darjah && data[i][4] === rekod.kelas) {
      row = i;
    }
  }
  if (row < 0) return;

  if (rekod.naikPeringkat) {
    const ci = ORDER.indexOf(rekod.peringkat);
    const next = ci >= 0 && ci < ORDER.length-1 ? ORDER[ci+1] : rekod.peringkat;
    let nm = 1, nl = next;
    if (next === 'Al-Quran') { nl = 'Al-Quran (Juzuk 1)'; }
    else if (next !== 'Khatam') {
      const ref = rekod.jenis === 'Iqra Baru' ? IQRA_BARU[next] : IQRA_LAMA[next];
      if (ref) { nm = ref.dari; nl = next+' ('+(ref.jilid||rekod.jenis)+')'; }
    }
    sheet.getRange(row+1,7).setValue(rekod.jenis||'');
    sheet.getRange(row+1,8).setValue(next);
    sheet.getRange(row+1,9).setValue(nl);
    sheet.getRange(row+1,10).setValue(nm);
  } else {
    sheet.getRange(row+1,7).setValue(rekod.jenis||'');
    sheet.getRange(row+1,8).setValue(rekod.peringkat||'');
    sheet.getRange(row+1,9).setValue(rekod.iqraLabel||'');
    sheet.getRange(row+1,10).setValue(parseInt(rekod.ke)||0);
  }
  sheet.getRange(row+1,14).setValue(new Date().toISOString());
}

// ================================================================
//  KHATAM
// ================================================================
function apiAddKhatam(body) {
  const {khatam} = body;
  if (!khatam || !khatam.muridNama) return {ok:false, msg:'Data khatam tidak lengkap'};

  try {
    const sheet = _getSheet(SH.KHATAM);
    const id = _genId('K');
    sheet.appendRow([
      id, khatam.muridId||'', khatam.muridNama,
      khatam.darjah||'', khatam.kelas||'',
      parseInt(khatam.bilangan)||1,
      parseInt(khatam.tahun)||new Date().getFullYear(),
      khatam.tarikh||new Date().toISOString().split('T')[0],
      khatam.guru||'', khatam.catatan||''
    ]);

    // Kemaskini bilKhatam dalam sheet Murid
    try {
      const mSheet = _getSheet(SH.MURID);
      const mData = mSheet.getDataRange().getValues();
      const namaCari = String(khatam.muridNama||'').trim().toUpperCase();
      for (let i = 1; i < mData.length; i++) {
        const match = mData[i][0] === khatam.muridId ||
          (String(mData[i][1]||'').trim().toUpperCase() === namaCari &&
           mData[i][3] === khatam.darjah && mData[i][4] === khatam.kelas);
        if (match) {
          mSheet.getRange(i+1,8).setValue('Khatam');
          mSheet.getRange(i+1,11).setValue(parseInt(khatam.bilangan)||1);
          mSheet.getRange(i+1,10).setValue(604);
          break;
        }
      }
    } catch(em) {}

    _log('Khatam', khatam.muridNama, 'Ke-'+khatam.bilangan+' ('+khatam.tahun+')');
    return {ok:true, id};
  } catch(e) {
    return {ok:false, msg:'Gagal simpan khatam: '+e.message};
  }
}

// ================================================================
//  MURID
// ================================================================
function apiAddMurid(body) {
  const {murid} = body;
  if (!murid || !murid.nama) return {ok:false, msg:'Data murid tidak lengkap'};

  try {
    const sheet = _getSheet(SH.MURID);
    const data = sheet.getDataRange().getValues();

    // Semak duplikat
    const namaBaru = String(murid.nama).trim().toUpperCase();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][1]||'').trim().toUpperCase() === namaBaru &&
          data[i][3] === murid.darjah && data[i][4] === murid.kelas) {
        return {ok:true, id:data[i][0], existing:true, msg:'Murid sudah wujud'};
      }
    }

    const id = murid.id || _genId('M');
    const now = new Date().toISOString();
    sheet.appendRow([
      id, murid.nama.trim(), murid.no||'',
      murid.darjah||'', murid.kelas||'', murid.guruId||'',
      murid.jenis||'Iqra Baru', murid.peringkat||'Iqra 1',
      murid.iqraLabel||'Iqra 1 (Jilid 1)', parseInt(murid.mukaSurat)||3,
      parseInt(murid.bilKhatam)||0, 'Aktif', now, now
    ]);
    return {ok:true, id};
  } catch(e) {
    return {ok:false, msg:'Gagal tambah murid: '+e.message};
  }
}

function apiEditMurid(body) {
  const {murid} = body;
  if (!murid || !murid.id) return {ok:false, msg:'ID murid diperlukan'};

  try {
    const sheet = _getSheet(SH.MURID);
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === murid.id) {
        if (murid.darjah)    sheet.getRange(i+1,4).setValue(murid.darjah);
        if (murid.kelas)     sheet.getRange(i+1,5).setValue(murid.kelas);
        if (murid.jenis)     sheet.getRange(i+1,7).setValue(murid.jenis);
        if (murid.peringkat) sheet.getRange(i+1,8).setValue(murid.peringkat);
        if (murid.iqraLabel) sheet.getRange(i+1,9).setValue(murid.iqraLabel);
        if (murid.mukaSurat) sheet.getRange(i+1,10).setValue(murid.mukaSurat);
        if (murid.bilKhatam !== undefined) sheet.getRange(i+1,11).setValue(murid.bilKhatam);
        if (murid.status)    sheet.getRange(i+1,12).setValue(murid.status);
        sheet.getRange(i+1,14).setValue(new Date().toISOString());
        return {ok:true};
      }
    }
    return {ok:false, msg:'Murid tidak dijumpai'};
  } catch(e) {
    return {ok:false, msg:'Gagal edit murid: '+e.message};
  }
}

// ================================================================
//  GURU
// ================================================================
function apiAddGuru(body) {
  const {guru} = body;
  if (!guru || !guru.nama) return {ok:false, msg:'Data guru tidak lengkap'};

  try {
    const sheet = _getSheet(SH.GURU);
    const data = sheet.getDataRange().getValues();
    const usernameBaru = String(guru.username||guru.email||'').toLowerCase();

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][2]||'').toLowerCase() === usernameBaru) {
        return {ok:true, id:data[i][0], existing:true, msg:'Guru sudah wujud'};
      }
    }

    const id = _genId('G');
    sheet.appendRow([
      id, guru.nama, guru.email||usernameBaru,
      guru.password ? _hash(guru.password) : '',
      guru.peranan||'guru', guru.darjah||'', guru.kelas||'',
      'Aktif', new Date().toISOString()
    ]);
    return {ok:true, id};
  } catch(e) {
    return {ok:false, msg:'Gagal tambah guru: '+e.message};
  }
}

function apiEditGuru(body) {
  const {guru} = body;
  if (!guru || !guru.id) return {ok:false, msg:'ID guru diperlukan'};

  try {
    const sheet = _getSheet(SH.GURU);
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === guru.id) {
        if (guru.nama)    sheet.getRange(i+1,2).setValue(guru.nama);
        if (guru.darjah)  sheet.getRange(i+1,6).setValue(guru.darjah);
        if (guru.kelas)   sheet.getRange(i+1,7).setValue(guru.kelas);
        if (guru.status)  sheet.getRange(i+1,8).setValue(guru.status);
        if (guru.password) sheet.getRange(i+1,4).setValue(_hash(guru.password));
        return {ok:true};
      }
    }
    return {ok:false, msg:'Guru tidak dijumpai'};
  } catch(e) {
    return {ok:false, msg:'Gagal edit guru: '+e.message};
  }
}

function apiChangePass(body) {
  const {userId, oldPass, newPass} = body;
  if (!newPass || newPass.length < 6) return {ok:false, msg:'Kata laluan baru minima 6 aksara'};

  try {
    const sheet = _getSheet(SH.GURU);
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === userId) {
        if (data[i][3] && data[i][3] !== _hash(oldPass||''))
          return {ok:false, msg:'Kata laluan lama tidak betul'};
        sheet.getRange(i+1,4).setValue(_hash(newPass));
        return {ok:true, msg:'Kata laluan berjaya ditukar'};
      }
    }
    return {ok:false, msg:'Pengguna tidak dijumpai'};
  } catch(e) {
    return {ok:false, msg:'Gagal tukar kata laluan: '+e.message};
  }
}

// ================================================================
//  TUKAR TAHUN — naikkan darjah murid aktif, Darjah 6 ditanda Tamat
// ================================================================
function apiTukarTahun(body) {
  const {tahunBaharu, kelasBaharu, oleh} = body;

  try {
    const sheet = _getSheet(SH.MURID);
    if (sheet.getLastRow() < 2) return {ok:false, msg:'Tiada murid dalam sheet Murid'};

    const kelasList = String(kelasBaharu||'').split(',').map(s=>s.trim()).filter(Boolean);
    const data = sheet.getRange(2,1,sheet.getLastRow()-1,14).getValues();

    let naik = 0, tamat = 0;
    for (let i = 0; i < data.length; i++) {
      const status = data[i][11];
      if (status !== 'Aktif') continue;

      const darjahSemasa = String(data[i][3]||'');
      const d = parseInt(darjahSemasa.replace('Darjah ',''), 10) || 0;
      const row = i + 2; // baris sebenar dalam sheet (1-based, +1 untuk header)

      if (d === 6) {
        sheet.getRange(row, 12).setValue('Tamat'); // lajur Status
        tamat++;
      } else if (d >= 1 && d <= 5) {
        sheet.getRange(row, 4).setValue('Darjah ' + (d + 1)); // lajur Darjah
        if (kelasList.length) {
          const kls = kelasList[Math.floor(Math.random() * kelasList.length)];
          sheet.getRange(row, 5).setValue(kls); // lajur Kelas
        }
        naik++;
      }
      sheet.getRange(row, 14).setValue(new Date().toISOString()); // Tarikh Kemaskini
    }

    _log('Tukar Tahun', oleh || 'Admin',
      naik + ' murid naik darjah, ' + tamat + ' murid (Darjah 6) ditanda Tamat — tahun baharu ' + tahunBaharu);

    return {
      ok: true,
      naik, tamat,
      msg: naik + ' murid naik darjah, ' + tamat + ' murid (Darjah 6) ditanda Tamat'
    };
  } catch (e) {
    return {ok:false, msg:'Gagal tukar tahun: '+e.message};
  }
}

// ================================================================
//  RESET & DEDUP MURID
// ================================================================
function apiResetMurid() {
  try {
    const sheet = _getSheet(SH.MURID);

    // Simpan data lama untuk kekal peringkat
    const lamaData = sheet.getLastRow() > 1
      ? sheet.getRange(2,1,sheet.getLastRow()-1,14).getValues()
      : [];
    const lamaMap = {};
    lamaData.forEach(r => {
      if (r[1]) {
        const key = String(r[1]).trim().toUpperCase()+'|'+r[3]+'|'+r[4];
        lamaMap[key] = {
          id:r[0], jenis:r[6], peringkat:r[7], iqraLabel:r[8],
          mukaSurat:r[9], bilKhatam:r[10]
        };
      }
    });

    // Kosongkan sheet (kekal header)
    const lastCol = Math.max(sheet.getLastColumn(), 14);
    const header = sheet.getRange(1,1,1,lastCol).getValues();
    sheet.clearContents();
    sheet.getRange(1,1,1,lastCol).setValues(header);

    // Isi semula 162 murid
    const rows = [];
    const now = new Date().toISOString();
    Object.values(MURID_SKDK).forEach(kls => {
      kls.murid.forEach(nama => {
        if (!nama || !nama.trim()) return;
        const key = nama.trim().toUpperCase()+'|'+kls.darjah+'|'+kls.kelas;
        const lama = lamaMap[key];
        rows.push([
          lama ? lama.id : _genId('M'),
          nama.trim(), '', kls.darjah, kls.kelas, '',
          lama ? (lama.jenis||'Iqra Baru') : 'Iqra Baru',
          lama ? (lama.peringkat||'Iqra 1') : 'Iqra 1',
          lama ? (lama.iqraLabel||'Iqra 1 (Jilid 1)') : 'Iqra 1 (Jilid 1)',
          lama ? (parseInt(lama.mukaSurat)||3) : 3,
          lama ? (parseInt(lama.bilKhatam)||0) : 0,
          'Aktif', now, now
        ]);
      });
    });

    if (rows.length > 0) {
      sheet.getRange(2,1,rows.length,rows[0].length).setValues(rows);
    }

    _log('Reset Murid', 'Admin', rows.length+' murid diisi semula');
    return {ok:true, added:rows.length, msg:rows.length+' murid berjaya diisi semula'};
  } catch(e) {
    return {ok:false, msg:'Gagal reset murid: '+e.message};
  }
}

function apiDedupMurid() {
  try {
    const sheet = _getSheet(SH.MURID);
    if (sheet.getLastRow() < 2) return {ok:true, buang:0, kekal:0};

    const data = sheet.getRange(2,1,sheet.getLastRow()-1,14).getValues();
    const seen = new Set();
    const kekal = [];
    let buang = 0;

    // Utamakan murid yang ada rekod
    const rekodSheet = _getSheet(SH.REKOD);
    const rekodIds = rekodSheet.getLastRow() > 1
      ? new Set(rekodSheet.getRange(2,5,rekodSheet.getLastRow()-1,1).getValues().flat())
      : new Set();

    const sorted = [...data].sort((a,b) => {
      return (rekodIds.has(b[0])?1:0) - (rekodIds.has(a[0])?1:0);
    });

    sorted.forEach(row => {
      if (!row[1]) return;
      const key = String(row[1]).trim().toUpperCase()+'|'+row[3]+'|'+row[4];
      if (!seen.has(key)) { seen.add(key); kekal.push(row); }
      else buang++;
    });

    if (buang > 0) {
      sheet.getRange(2,1,data.length,14).clearContent();
      if (kekal.length > 0) {
        sheet.getRange(2,1,kekal.length,kekal[0].length).setValues(kekal);
      }
    }

    return {ok:true, buang, kekal:kekal.length};
  } catch(e) {
    return {ok:false, msg:'Gagal dedup: '+e.message};
  }
}

// ================================================================
//  SETUP — Jalankan SEKALI sahaja
// ================================================================
function setupSheets() {
  const ss = _ss();
  ss.setName('Sistem Tasmik '+SEKOLAH);

  function buat(nama, header) {
    let sheet = ss.getSheetByName(nama);
    if (!sheet) { sheet = ss.insertSheet(nama); }
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1,1,1,header.length).setValues([header]);
      sheet.getRange(1,1,1,header.length)
        .setBackground('#0f4c35').setFontColor('white').setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    return sheet;
  }

  buat(SH.GURU,   ['ID','Nama','Email/Username','Password','Peranan','Darjah','Kelas','Status','Tarikh Daftar']);
  buat(SH.MURID,  ['ID','Nama','No. Murid','Darjah','Kelas','Guru ID','Jenis Iqra','Peringkat','Iqra Label','Muka Surat','Bil Khatam','Status','Tarikh Daftar','Tarikh Kemaskini']);
  buat(SH.REKOD,  ['ID','Tarikh','Hari','Masa','Murid ID','Nama Murid','Darjah','Kelas','Guru ID','Nama Guru','Jenis','Peringkat','Iqra Label','M/S Dari','M/S Ke','Jumlah','Kualiti','Catatan']);
  buat(SH.KHATAM, ['ID','Murid ID','Nama Murid','Darjah','Kelas','Bilangan','Tahun','Tarikh','Guru','Catatan']);
  buat(SH.KBS,    ['ID','Murid ID','Nama Murid','Darjah','Kelas','Tahap','Tahun','Section','Item ID','Item Teks','Status','Guru','Tarikh']);
  buat(SH.LOG,    ['Tarikh','Tindakan','Oleh','Detail']);
  buat(SH.CONFIG, ['Kunci','Nilai']);

  // Seed admin
  const guruSheet = ss.getSheetByName(SH.GURU);
  if (guruSheet.getLastRow() < 2) {
    guruSheet.appendRow([
      'G0001', 'Admin SK Datin Khadijah', ADMIN_EMAIL,
      _hash('admin@SKDK2025'), 'admin', '', '', 'Aktif', new Date().toISOString()
    ]);
  }

  SpreadsheetApp.getUi().alert('✅ Setup selesai! Sila jalankan "resetMuridSekarang" untuk isi murid.');
}

// ================================================================
//  FUNGSI KECEMASAN — Jalankan dari editor
// ================================================================
function resetMuridSekarang() {
  const result = apiResetMurid();
  try {
    SpreadsheetApp.getUi().alert(
      result.ok
        ? '✅ Berjaya! '+result.added+' murid diisi semula.'
        : '❌ Gagal: '+result.msg
    );
  } catch(e) {
    Logger.log(result.ok ? '✅ '+result.added+' murid' : '❌ '+result.msg);
  }
}

function testRekod() {
  const result = apiAddRekod({rekod:{
    muridId:'TEST', muridNama:'TEST MURID', darjah:'Darjah 4', kelas:'Jauhari',
    guruId:'GS004', guru:'Adam Aiman', jenis:'Iqra Baru', peringkat:'Iqra 1',
    iqraLabel:'Iqra 1 (Jilid 1)', dari:3, ke:10, jumlah:8,
    kualiti:'Cemerlang ⭐⭐⭐', catatan:'Test', kemaskini:false, naikPeringkat:false,
    tarikh:new Date().toISOString()
  }});
  try {
    SpreadsheetApp.getUi().alert(result.ok ? '✅ Rekod test berjaya! ID: '+result.id : '❌ '+result.msg);
  } catch(e) {
    Logger.log(JSON.stringify(result));
  }
}

function resetAdminPass() {
  const sheet = _getSheet(SH.GURU);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][4] === 'admin') {
      sheet.getRange(i+1, 4).setValue(_hash('admin@SKDK2025'));
      SpreadsheetApp.getUi().alert('✅ Kata laluan admin telah direset ke: admin@SKDK2025');
      return;
    }
  }
  SpreadsheetApp.getUi().alert('❌ Admin tidak dijumpai');
}

function debugSheets() {
  const ss = _ss();
  const sheets = ss.getSheets();
  let info = 'Spreadsheet: ' + ss.getName() + '\nID: ' + ss.getId() + '\n\nSheets:\n';
  sheets.forEach(s => {
    info += '- ' + s.getName() + ': ' + s.getLastRow() + ' baris\n';
  });
  Logger.log(info);
  try {
    SpreadsheetApp.getUi().alert(info);
  } catch(e) {
    Logger.log(info);
  }
}

function debugSheetRekod() {
  try {
    const ss = _ss();
    const sheets = ss.getSheets().map(s => s.getName()+' ('+s.getLastRow()+' baris)');
    Logger.log('Semua sheet: ' + sheets.join(', '));
    
    const rekodSheet = _getSheet(SH.REKOD);
    Logger.log('Sheet Rekod nama: ' + rekodSheet.getName());
    Logger.log('Sheet Rekod baris: ' + rekodSheet.getLastRow());
    Logger.log('SH.REKOD value: ' + SH.REKOD);
    
    // Cuba tulis test
    rekodSheet.appendRow(['TEST_DEBUG', new Date().toISOString(), 'Test', '10:00', 'M001', 'Nama Test', 'Darjah 4', 'Jauhari', 'GS004', 'Adam', 'Iqra Baru', 'Iqra 1', 'Iqra 1 (Jilid 1)', 3, 10, 8, 'Cemerlang', '']);
    Logger.log('appendRow berjaya! Baris baru: ' + rekodSheet.getLastRow());
    
    SpreadsheetApp.getUi().alert('✅ Debug berjaya!\nSheet Rekod: ' + rekodSheet.getName() + '\nBaris sekarang: ' + rekodSheet.getLastRow());
  } catch(e) {
    Logger.log('ERROR: ' + e.message);
    SpreadsheetApp.getUi().alert('❌ Error: ' + e.message);
  }
}

function cekSpreadsheet() {
  try {
    const ss1 = SpreadsheetApp.getActiveSpreadsheet();
    const ss2 = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('Active SS: ' + (ss1 ? ss1.getId() : 'NULL'));
    Logger.log('openById SS: ' + ss2.getId());
    Logger.log('SPREADSHEET_ID: ' + SPREADSHEET_ID);
    Logger.log('Sama?: ' + (ss1 && ss1.getId() === ss2.getId()));
    
    // Tulis ke ss2 terus
    const rekodSheet = ss2.getSheetByName('Rekod');
    rekodSheet.appendRow(['CEK_'+Date.now(), new Date().toISOString(), 'Rabu', '11:00', 'M001', 'CEK MURID', 'Darjah 4', 'Jauhari', 'GS004', 'Adam', 'Iqra Baru', 'Iqra 1', 'Iqra 1 (Jilid 1)', 3, 10, 8, 'Cemerlang', '']);
    Logger.log('Tulis berjaya ke ss2! Baris: ' + rekodSheet.getLastRow());
    
    SpreadsheetApp.getUi().alert(
      'Active SS ID: ' + (ss1 ? ss1.getId() : 'NULL') + '\n' +
      'openById ID: ' + ss2.getId() + '\n' +
      'Sama?: ' + (ss1 && ss1.getId() === ss2.getId()) + '\n' +
      'Rekod baris: ' + rekodSheet.getLastRow()
    );
  } catch(e) {
    SpreadsheetApp.getUi().alert('ERROR: ' + e.message);
  }
}

// Test doPost secara terus tanpa Web App
function testDoPostTerus() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        action: 'addRekod',
        rekod: {
          muridId: 'M001',
          muridNama: 'TEST DOPOST',
          darjah: 'Darjah 4',
          kelas: 'Jauhari',
          guruId: 'GS004',
          guru: 'Adam Aiman',
          jenis: 'Iqra Baru',
          peringkat: 'Iqra 1',
          iqraLabel: 'Iqra 1 (Jilid 1)',
          dari: 3,
          ke: 10,
          jumlah: 8,
          kualiti: 'Cemerlang',
          catatan: 'test dopost terus',
          kemaskini: false,
          naikPeringkat: false,
          tarikh: new Date().toISOString()
        }
      })
    }
  };
  
  const result = doPost(fakeEvent);
  const text = result.getContent();
  Logger.log('Result: ' + text);
  
  // Semak sheet rekod
  const sheet = _getSheet(SH.REKOD);
  Logger.log('Rekod baris selepas: ' + sheet.getLastRow());
  
  SpreadsheetApp.getUi().alert(
    'doPost result: ' + text + '\n' +
    'Rekod baris: ' + sheet.getLastRow()
  );
}

// Ujian diagnostik KHUSUS setKBS — jalankan TERUS dalam editor (tak perlu deploy)
// untuk pastikan kod dalam editor ni sendiri kenal action 'setKBS' atau tidak.
function testSetKBSTerus() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        action: 'setKBS',
        kbs: {
          muridId: 'TEST_M001',
          muridNama: 'TEST MURID KBS',
          darjah: 'Darjah 2',
          kelas: 'Jauhari',
          tahap: 1,
          tahun: new Date().getFullYear(),
          sectionKey: 'wuduk',
          itemId: 'w1',
          itemTeks: 'Bacaan basmalah',
          status: 'M',
          guru: 'Ujian Diagnostik',
          tarikh: new Date().toISOString()
        }
      })
    }
  };

  const result = doPost(fakeEvent);
  const text = result.getContent();
  Logger.log('testSetKBSTerus result: ' + text);

  let bilBarisKBS = 'N/A (sheet KBS tidak dijumpai)';
  try {
    bilBarisKBS = _getSheet(SH.KBS).getLastRow();
  } catch(e) {}

  SpreadsheetApp.getUi().alert(
    'doPost(setKBS) result: ' + text + '\n' +
    'Baris dalam sheet KBS sekarang: ' + bilBarisKBS
  );
}
