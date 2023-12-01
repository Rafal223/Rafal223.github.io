var AktualnaMapa=0;

var OknoX = 1080;
var OknoY = 630;

var szybkosc = 5;
var grawitacja = 10;


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

function ZmienTloMapy(AM)
{
    document.getElementById("Tlo").style.backgroundImage = "url(Resources/Mapy/"+AM+".png)";
}

var ListaoBrazow = [];
function UsunObrazy()
{
    for(i=0;i<ListaoBrazow.length;i++)
    {
        document.getElementById(ListaoBrazow[i]).remove();
    }
    ListaoBrazow=[];
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
    ZmienTloMapy(AktualnaMapa);
    if(AktualnaMapa==0)
    {
        var element = document.createElement("img");
        element.id = "img"+ListaoBrazow.length;
        element.src = "Resources/syzyf.gif";
        element.style.height= 100 +"px";
        element.style.width= 100 + "px";
        element.style.top = 510 + "px";
        element.style.left = 730 + "px";
        element.style.position = "absolute";
        document.getElementById("Tlo").appendChild(element);
        ListaoBrazow.push("img"+ListaoBrazow.length);
    }
    else if(AktualnaMapa==9)
    {
        var element = document.createElement("img");
        element.id = "img"+ListaoBrazow.length;
        element.src = "Resources/goblin.gif";
        element.style.height= 50 +"px";
        element.style.width= 50 + "px";
        element.style.top = 206 + "px";
        element.style.left = 505 + "px";
        element.style.position = "absolute";
        document.getElementById("Tlo").appendChild(element);
        ListaoBrazow.push("img"+ListaoBrazow.length);
    }
    else
    {
        UsunObrazy();
    }
}

function RysujObiektNaMapie(numer, txt, height1, width1, x, y) {
    var element = document.createElement("div");
    element.className = "platforma";
    element.id = numer;
    element.style.top = y + "px";
    element.style.left = x + "px";
    element.style.height = height1 + "px";
    element.style.width = width1 + "px";
    //element.style.backgroundColor = txt;
    document.getElementById("Tlo").appendChild(element);
}

function RysujGracza()
{
    var element = document.createElement("div");
    element.id = "gracz";
    element.style.top = "500px";
    element.style.left = "410px";
    element.style.backgroundImage= "url(Resources/KS-prawo.png)";
    document.getElementById("Tlo").appendChild(element);
}
var Spada = false;

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


var MiniGameTime=0;
var Sekundy = 0;
var Minuty = 0;
var Godziny = 0;

var ZmienMape=3;

var PoruszaSie = false;
var Strona=1;
function Gra()
{
    if(PoruszaSie==false)
    {
        if(Strona==1)
        {
            AnimacjaGracza("url(Resources/KS-prawo.png)");
        }
        else
        {
            AnimacjaGracza("url(Resources/KS-lewo.png)");
        }
    }

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
        PozycjaY = 0;
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
            Odbilsie=1;
            CzyLewo*=(-1)/2;
        }
    }
    if(PozycjaX < 0)
    {
        PozycjaX = 0;
        Gracz.style.left = PozycjaX + 'px';
        if(WykonujeSkok == true)
        {
            Odbilsie=1;
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
    grawitacja=10;
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