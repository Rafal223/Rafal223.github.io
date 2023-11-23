var AktualnaMapa=0;

function ZmienAktualnaMape(id)
{
    UsunObiekty();
    AktualnaMapa=id;
    RysujObiekty(mapa[AktualnaMapa]);
}

function UsunObiekty()
{
    for(i=0;i<mapa[AktualnaMapa].length; i++)
    {
        document.getElementById(i).remove();
    }
}

function RysujObiekty(amapa)
{
    for(i=0;i<amapa.length; i++)
    {
        RysujObiektNaMapie(
            i,
            id[amapa[i][0]][1],
            id[amapa[i][0]][2],
            id[amapa[i][0]][3],
            amapa[i][1],
            amapa[i][2]
            );
    }
    SprawdzObiektyDoKolizji();
    if(AktualnaMapa==0)
    {
        var element = document.createElement("img");
        element.id = "syzyf";
        element.src = "https://2.bp.blogspot.com/-fe40bL7CK7Q/T2Dhzjx6IzI/AAAAAAAAAh8/ffGoH-_A9eM/s400/syzyf1.jpg";
        element.alt = "Syzyf już kamień wtoczył tak o ;/";
        element.style.height= 45 +"px";
        element.style.width= 45 + "px";
        element.style.top = 565 + "px";
        element.style.left = 785 + "px";
        element.style.position = "absolute";
        document.getElementById("Tlo").appendChild(element);
    }
    else if (AktualnaMapa!=0 && document.getElementById('syzyf')!=null)
    {
        document.getElementById("syzyf").remove();
    }
}

var OknoX = 1080;
var OknoY = 630;

function RysujObiektNaMapie(numer, txt, height1, width1, x, y) {
    var element = document.createElement("div");
    element.className = "platforma";
    element.id = numer;
    element.style.top = y + "px";
    element.style.left = x + "px";
    element.style.height = height1 + "px";
    element.style.width = width1 + "px";
    element.style.backgroundColor = txt;
    document.getElementById("Tlo").appendChild(element);
}

function RysujGracza()
{
    var element = document.createElement("div");
    element.id = "gracz";
    element.style.top = "500px";
    element.style.left = "410px";
    document.getElementById("Tlo").appendChild(element);
}

var szybkosc = 5;
var grawitacja = 10;

var NajblizszyObiekt = [];
var PoprzedniObiekt = [];

var Spada = false;

function SprawdzStroneKolizji(IdKolizji)
{
    let OdlegloscLewej = mapa[AktualnaMapa][IdKolizji][1]
    let OdlegloscGory = mapa[AktualnaMapa][IdKolizji][2] 
    let OdlegloscPrawej = mapa[AktualnaMapa][IdKolizji][1]+id[mapa[AktualnaMapa][IdKolizji][0]][3] 
    let OdlegloscDolnej = mapa[AktualnaMapa][IdKolizji][2]+id[mapa[AktualnaMapa][IdKolizji][0]][2]
    let PozycjaGracza=[PozycjaX+25,PozycjaY+25];

    if(PozycjaGracza[0]+25<=OdlegloscLewej && PozycjaGracza[1]-25>=OdlegloscDolnej || PozycjaGracza[0]+25<=OdlegloscLewej && PozycjaGracza[1]+25<=OdlegloscGory || PozycjaGracza[0]-25>=OdlegloscPrawej && PozycjaGracza[1]-25>=OdlegloscDolnej || PozycjaGracza[0]-25>=OdlegloscPrawej && PozycjaGracza[1]+25<=OdlegloscGory)
    {
        ListaAktualnychObiektowDoKolizji[IdKolizji][3]=true;
        ListaAktualnychObiektowDoKolizji[IdKolizji][4]=true;
    }
    if(ListaAktualnychObiektowDoKolizji[IdKolizji][2]==undefined)
    {
        ListaAktualnychObiektowDoKolizji[IdKolizji][3]=true;
        ListaAktualnychObiektowDoKolizji[IdKolizji][4]=true;
    }
    
    if(PozycjaGracza[0]+25>OdlegloscLewej && PozycjaGracza[0]-25<OdlegloscPrawej && ListaAktualnychObiektowDoKolizji[IdKolizji][3])
    {
        ListaAktualnychObiektowDoKolizji[IdKolizji][4]=false;
        if(PozycjaGracza[1]<OdlegloscGory)
        {
            return "nad";
        }
        if(PozycjaGracza[1]>OdlegloscDolnej)
        {
            return "pod";
        }
    }

    if(PozycjaGracza[1]+25>OdlegloscGory && PozycjaGracza[1]-25<OdlegloscDolnej && ListaAktualnychObiektowDoKolizji[IdKolizji][4])
    {
        ListaAktualnychObiektowDoKolizji[IdKolizji][3]=false;
        if(PozycjaGracza[0]<OdlegloscLewej)
        {
            return "nalewo";
        }
        if(PozycjaGracza[0]>OdlegloscPrawej)
        {
            return "naprawo";
        }
    }
}

var ListaAktualnychObiektowDoKolizji = [];

function SprawdzObiektyDoKolizji()
{
    if(ListaAktualnychObiektowDoKolizji!=null)
    {
        ListaAktualnychObiektowDoKolizji = [];
    }
    for(i=0;i<mapa[AktualnaMapa].length;i++)
    {
        ListaAktualnychObiektowDoKolizji.push([i,mapa[AktualnaMapa][i],null,true,true]);
    }
}

let pierwszyraz = 0;
let poprzedniraz = 0;
function SprawdzCzyPierwszyRaz()
{
    if(pierwszyraz!=0 && poprzedniraz==0)
    {
        poprzedniraz = pierwszyraz;
    }
    if(pierwszyraz==0)
    {
        pierwszyraz = 1;
    }
    if(pierwszyraz!=poprzedniraz)
    {
        return true;
    }
}

function SpadaWDol()
{
    if(Spada)
    {
        CanMove=false;
        CanJump=false;
    }
}

function Kolizje()
{
    for(i=0;i<mapa[AktualnaMapa].length;i++)
    {
        ListaAktualnychObiektowDoKolizji[i][2]=SprawdzStroneKolizji(i);

        if(SprawdzKolizjeX(PozycjaX,50,i,0))
        {

            if(PozycjaX+50 >= mapa[AktualnaMapa][i][1] && ListaAktualnychObiektowDoKolizji[i][2]=="nalewo")
            {
                PozycjaX = mapa[AktualnaMapa][i][1]-50;
                Gracz.style.left = PozycjaX + 'px';
            }
            if(PozycjaX < mapa[AktualnaMapa][i][1]+id[mapa[AktualnaMapa][i][0]][3] && ListaAktualnychObiektowDoKolizji[i][2]=="naprawo")
            {
                PozycjaX = mapa[AktualnaMapa][i][1]+id[mapa[AktualnaMapa][i][0]][3];
                Gracz.style.left = PozycjaX + 'px';
            }

            if(SprawdzKolizjeY(PozycjaY,50,i,0))
            {
                if(NajblizszyObiekt==null && PoprzedniObiekt==null)
                {
                    NajblizszyObiekt = mapa[AktualnaMapa][i];
                }
                else
                {
                    PoprzedniObiekt=NajblizszyObiekt;
                    NajblizszyObiekt = mapa[AktualnaMapa][i];
                }
                if(NajblizszyObiekt!=PoprzedniObiekt && PoprzedniObiekt!=null)//JESLI KOLIZIUJE Z INNYM OBIEKTEM PO RAZ 1
                {
                    if(ListaAktualnychObiektowDoKolizji[i][2]=="nad")
                    {
                        KoniecSkoku();
                    }
                    if(ListaAktualnychObiektowDoKolizji[i][2]=="pod")
                    {
                        Czas=60;
                    }
                    if(ListaAktualnychObiektowDoKolizji[i][2]=="nalewo" || ListaAktualnychObiektowDoKolizji[i][2]=="naprawo")
                    {
                        CzyLewo*=(-1)/2;
                    }
                }
                //KOLIZIUJE Z INNYM OBIEKTEM
                //kolizje działają w taki sposób, że kiedy gracz osiągnie pozycję ściany obiektu i wejdzie on w nią
                //(np. pozycja gracza będzie wieksza niż pozycja lewej ścianki) PLUS do tego pozycja gracza będzie
                //mniejsza niż pozycja ścianki obiektu TEJ SAMEJ, lecz maksymalnie do 1 wartości więcej (np, pozycja
                //gracza będzie wieksza niż pozycja lewej ścianki + będzie mniejsza niż pozycja lewej ścianki+1) to cofa gracza
                if(PozycjaY+50 >= mapa[AktualnaMapa][i][2] && ListaAktualnychObiektowDoKolizji[i][2]=="nad")
                {
                    Spada=false;
                    PozycjaY = mapa[AktualnaMapa][i][2]-50;
                    grawitacja=0;
                    Gracz.style.top = PozycjaY + 'px';
                    CanMove = true;
                    CanJump = true;
                }
                if(PozycjaY < mapa[AktualnaMapa][i][2]+id[mapa[AktualnaMapa][i][0]][2] && ListaAktualnychObiektowDoKolizji[i][2]=="pod")
                {
                    PozycjaY = mapa[AktualnaMapa][i][2]+id[mapa[AktualnaMapa][i][0]][2];
                    Gracz.style.top = PozycjaY + 'px';
                }
            }
        }
    }
}

function SprawdzKolizjeX(ObjX,size,Id,plus)
{
    return (
        ObjX+size > mapa[AktualnaMapa][Id][1]-plus &&
        ObjX < mapa[AktualnaMapa][Id][1] + id[mapa[AktualnaMapa][Id][0]][3]+plus
    );
}
function SprawdzKolizjeY(ObjY,size,Id,plus)
{
    return (
        ObjY+size > mapa[AktualnaMapa][Id][2]-plus  &&
        ObjY < mapa[AktualnaMapa][Id][2] + id[mapa[AktualnaMapa][Id][0]][2]+plus
    );
}


//moement mobile

function DodajSkok(liczba)
{
    przyciski[liczba] = true;
}
function UsunSkok(liczba)
{
    delete przyciski[liczba];

    if(Skok>=10)
        {
            Skocz()
        }
}

//movement PC

var przyciski={}

document.addEventListener("keydown",function(e)
    {
        przyciski[e.keyCode] = true;
    })

document.addEventListener("keyup",function(e)
    {
        delete przyciski[e.keyCode];

        if(Skok>=10)
        {
            Skocz()
        }
    })

var prawo = false;
var lewo = false;

function Skocz()
{
    CanJump=false;
    CanMove=false;
    WykonujeSkok = true;
}

var PozycjaX = 410;
var PozycjaY = 500;

var Skok = 0;
var CanMove = true;
var CanJump = true;

function Ruszaj()
{
    for(var direction in przyciski){
        if(direction == 32 && CanJump && WykonujeSkok==false)
        {
            MocSkoku=10;
            CzyLewo=10;
            if(przyciski[37] != null)
            {
                lewo=false;
                prawo=true;
            }
            else if(przyciski[39] != null)
            {
                lewo = true;
                prawo=false;
            }
            else
            {
                lewo=false;
                prawo=false;
            }
            if(Skok<100)
            {
                Skok += 3.5;
            }
            CanMove=false;
        }
        else if(direction == 37 && CanMove)
        {
            var left = parseInt(Gracz.style.left) || 0;
            Gracz.style.left = PozycjaX - szybkosc+ 'px';
            PozycjaX = left - szybkosc;
        }
        else if(direction == 39 && CanMove)
        {
            var left = parseInt(Gracz.style.left) || 0;
            Gracz.style.left = left + szybkosc + 'px';
            PozycjaX = left + szybkosc;
        }
    }
}
var WykonujeSkok = false;
var Czas=0;

function KoniecSkoku()
{
    Czas=0
    grawitacja=0;
    Skok=0;
    WykonujeSkok=false;
    CzyLewo=0;
    MocSkoku=10;
}

var MocSkoku=10;
var CzyLewo = 0;
function SkokNarciarz(A,B,kierunek)
{
    CanJump=false;
    CanMove=false;
    grawitacja=0
    A *= Skok/100
    B /= Skok/100
    if(Czas<30*(Skok/100))
    {
        PozycjaY = PozycjaY-(MocSkoku*1.5*Skok/100);
        MocSkoku-=0.3+(0.3*((100-Skok)/100));
    }
    else if(Czas>=30*(Skok/100) && Czas<=60*(Skok/100))
    {
        PozycjaY = PozycjaY+(MocSkoku*1.5*Skok/100);
        MocSkoku+=0.3+(0.3*((100-Skok)/100));
    }
    else
    {
        grawitacja=15;
    }

    if(kierunek==1)
    {
        PozycjaX = PozycjaX+(CzyLewo*Skok/100)*1.2;
    }
    else if (kierunek==2)
    {
        PozycjaX = PozycjaX+(-CzyLewo*Skok/100)*1.2;
    }
    Gracz.style.left = PozycjaX + 'px';
    Gracz.style.top = PozycjaY + 'px';
    Czas+=1;
    NajblizszyObiekt=[null];
}

var MiniGameTime=0;
var Sekundy = 0;
var Minuty = 0;
var Godziny = 0;

var ZmienMape=3;

function Gra()
{
    if(grawitacja>0)
    {
        SpadaWDol();
    }
    else
    {
        Spada=true;
    }
    Gracz.style.top = PozycjaY+'px';
    Gracz.style.left = PozycjaX+'px';
    MiniGameTime+=1;
    if(MiniGameTime>=60)
    {
        Sekundy+=1;
        MiniGameTime=0;
        if(Sekundy>=60)
        {
            Minuty+=1;
            Sekundy=0;
            if(Minuty>=60)
            {
                Godziny+=1;
                Minuty=0;
            }
        }
    }
if(ZmienMape==1)
{
    PozycjaY = 0+50;
    Gracz.style.top = PozycjaY + 'px';
    UsunObiekty();
    AktualnaMapa-=1;
    RysujObiekty(mapa[AktualnaMapa]);
    ZmienMape=3;
}
else if(ZmienMape==0)
{
    PozycjaY = 630-50;
    Gracz.style.top = PozycjaY + 'px';
    UsunObiekty();
    AktualnaMapa+=1;
    RysujObiekty(mapa[AktualnaMapa]);
    ZmienMape=3;
}

    document.getElementById("text").innerHTML ="<p>Czas gry: "+DwaZera(Godziny,2)+":"+DwaZera(Minuty,2)+":"+DwaZera(Sekundy,2)+"</p>";
    var A=10
    var B=0.04

    if(PozycjaX+50 > OknoX)
    {
        PozycjaX = OknoX-50;
        Gracz.style.left = PozycjaX + 'px';
        if(WykonujeSkok==true)
        {
            CzyLewo*=(-1)/2;
        }
    }
    if(PozycjaX < 0)
    {
        PozycjaX = 0;
        Gracz.style.left = PozycjaX + 'px';
        if(WykonujeSkok == true)
        {
            CzyLewo*=(-1)/2;
        }
    }
    if(PozycjaY < 0) //do przodu
    {
        ZmienMape=0;
    }
    if(PozycjaY+50 > OknoY) //do tylu
    {
        ZmienMape=1;
    }

    if(WykonujeSkok)
    {
        if(prawo == false && lewo == true)
        {
            SkokNarciarz(A,B,1);
        }
        else if(prawo == true && lewo == false)
        {
            SkokNarciarz(A,B,2);
        }
        else
        {
            SkokNarciarz(A,B,0);
        }
    }

    if(grawitacja>0){
        var top = parseInt(Gracz.style.top) || 0;
        Gracz.style.top = top + grawitacja + 'px';
        PozycjaY = top + grawitacja;
    }

    if(Skok>=100)
    {
        Skocz();
        Skok=100;
    }
    grawitacja=15;
    Kolizje();
    Ruszaj();
}

function DwaZera(num, Totalength)
{
    return String(num).padStart(Totalength,'0');
}

//[id,img,height,width]
var id = [
    [0,"pink",25,OknoX],
    [1,"lightgreen",25,200],
    [2,"brown",25,150],
    [3,"blue",25,100],
    [4,"yellow",25,50],
    [5,"red",25,25],
    [6,"red",15,15],
    [7,"pink",100,100],
    [8,"pink",150,150],
    [9,"pink",50,50],
    [10,"pink",250,25],
    [11,"green",250,250],
    [12,"pink",OknoY,25],
    [13,"pink",485,25]
];
RysujObiekty(mapa[AktualnaMapa]);
RysujGracza();
var Gracz = document.getElementById('gracz');
setInterval(Gra,16);