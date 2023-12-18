
//poruszanie sie na telefonie

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

//poruszanie sie na komputerze

var przyciski={}

document.addEventListener("keydown",function(e)
    {
        przyciski[e.keyCode] = true;
    })

document.addEventListener("keyup",function(e)
    {
        delete przyciski[e.keyCode];

        if(e.keyCode == 32)
        {
            Skocz()
        }
    })

var prawo = false;
var lewo = false;

var posx;
var posy;
var moc;
var mapka;

function CzarnaDziura(posx,posy,moc,mapka)
{
    let odlegloscx = PozycjaX-posx;
    let odlegloscy = PozycjaY-posy;

    if(Math.abs(PozycjaX-posx)<300 && Math.abs(PozycjaY-posy)<300)
    {
        moc*=2;
    }
    if(Math.abs(PozycjaX-posx)<150 && Math.abs(PozycjaY-posy)<150)
    {
        moc*=2;
    }
    if(Math.abs(PozycjaX-posx)>=150 && Math.abs(PozycjaY-posy)>=150)
    {
        moc/=2;
    }
    if(Math.abs(PozycjaX-posx)>=300 && Math.abs(PozycjaY-posy)>=300)
    {
        moc/=2;
    }
    if(WykonujeSkok)
    {
        if(odlegloscx<0)
        {
            PozycjaX+=moc;
        }
        else if(odlegloscx>0)
        {
            PozycjaX-=moc;
        }
        if(odlegloscy<0)
        {
            PozycjaY+=moc
        }
        else if(odlegloscy>0)
        {
            PozycjaY-=moc;
        }
    }
    else
    {
        moc = moc/4;
        if(odlegloscx<0)
        {
            PozycjaX+=moc;
        }
        else if(odlegloscx>0)
        {
            PozycjaX-=moc;
        }
    }
    if(AktualnaMapa!=mapka)
    {
        listagrawitacji.shift(0);
    }
}


function Skocz()
{
    if(Skok<=20)
    {
        Skok=20;
    }
    CanJump=false;
    CanMove=false;
    WykonujeSkok = true;
    trzymaspacje=false;
}

var PozycjaX = 410;
var PozycjaY = 500;

var Skok = 0;
var CanMove = true;
var CanJump = true;

function AnimacjaGracza(px)
{
    Gracz.style.backgroundPositionX = px+"px";
}

var trzymaspacje;

function Ruszaj()
{
    for(var direction in przyciski){
        if(direction == 32 && CanJump && WykonujeSkok==false)
        {
            AnimacjaGracza(-100)

            trzymaspacje=true;
            CanMove=false;

            if(przyciski[37] != null)
            {
                lewo=false;
                prawo=true;
                Strona=0;
            }
            else if(przyciski[39] != null)
            {
                lewo = true;
                prawo=false;
                Strona=1;
            }
            else
            {
                lewo=false;
                prawo=false;
            }
        }
        else if(direction == 37 && CanMove)
        {
            var left = parseInt(Gracz.style.left) || 0;
            Gracz.style.left = PozycjaX - szybkosc+ 'px';
            PozycjaX = left - szybkosc;
            AnimacjaGracza(-150);
            PoruszaSie=true;
            Strona=0;
        }
        else if(direction == 39 && CanMove)
        {
            var left = parseInt(Gracz.style.left) || 0;
            Gracz.style.left = left + szybkosc + 'px';
            PozycjaX = left + szybkosc;
            AnimacjaGracza(-200);
            PoruszaSie=true;
            Strona=1;
        }
        PoruszaSie=false;
    }
}
var WykonujeSkok = false;
var Czas=0;

function KoniecSkoku()
{
    Skok=0;
    Czas=0
    grawitacja=0;
    CzyLewo=0;
    MocSkoku=10;
    Odbilsie=0;
    Gracz.style.animationName = "none";
    WykonujeSkok=false;
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
        if(Strona==1)
        {
            AnimacjaGracza(-350);
        }
        else
        {
            AnimacjaGracza(-400);
        }
        grawitacja=10;
    }

    if(kierunek==1)
    {
        if(Odbilsie==0 && Czas<30*(Skok/100))
        {
            AnimacjaGracza(-300);
        }
        else if(Odbilsie==1)
        {
            AnimacjaGracza(-450);
            Gracz.style.animationName = "Rotacja";
        }
        if(Odbilsie==0 && Czas>30*(Skok/100))
        {
            AnimacjaGracza(-400);
        }
        PozycjaX = PozycjaX+(CzyLewo*Skok/100)*1.2;
    }
    else if (kierunek==2)
    {
        if(Odbilsie==0 && Czas<30*(Skok/100))
        {
            AnimacjaGracza(-250);
        }
        else if(Odbilsie==1)
        {
            AnimacjaGracza(-450);
            Gracz.style.animationName = "Rotacja";
        }
        if(Odbilsie==0 && Czas>30*(Skok/100))
        {
            AnimacjaGracza(-350);
        }
        PozycjaX = PozycjaX+(-CzyLewo*Skok/100)*1.2;
    }
    else
    {
        if(Czas<30*(Skok/100))
        {
            if(Strona==1)
            {
                AnimacjaGracza(-300);
            }
            else
            {
                AnimacjaGracza(-250);
            }
        }
        else
        {
            if(Strona==1)
            {
                AnimacjaGracza(-400);
            }
            else
            {
                AnimacjaGracza(-350);
            }
        }
    }
    Gracz.style.left = PozycjaX + 'px';
    Gracz.style.top = PozycjaY + 'px';
    Czas+=1;
    NajblizszyObiekt=[null];
}
function SpadaWDol()
{
    if(Spada)
    {
        CanMove=false;
        CanJump=false;
    }
}