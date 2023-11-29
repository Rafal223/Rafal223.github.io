function SpadaWDol()
{
    if(Spada)
    {
        CanMove=false;
        CanJump=false;
    }
}

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

function AnimacjaGracza(obrazek)
{
    if(Gracz.style.backgroundImage!=obrazek);
    {
        Gracz.style.backgroundImage= obrazek;
    }
}

function Ruszaj()
{
    for(var direction in przyciski){
        if(direction == 32 && CanJump && WykonujeSkok==false)
        {
            AnimacjaGracza("url(Resources/KS-kucek.png)");

            MocSkoku=10;
            CzyLewo=10;
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
            AnimacjaGracza("url(Resources/KS-move-lewo.gif)");
            PoruszaSie=true;
            Strona=0;
        }
        else if(direction == 39 && CanMove)
        {
            var left = parseInt(Gracz.style.left) || 0;
            Gracz.style.left = left + szybkosc + 'px';
            PozycjaX = left + szybkosc;
            AnimacjaGracza("url(Resources/KS-move-prawo.gif)");
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
    Czas=0
    grawitacja=0;
    Skok=0;
    WykonujeSkok=false;
    CzyLewo=0;
    MocSkoku=10;
    Odbilsie=0;
    Gracz.style.animationName = "none";
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
            AnimacjaGracza("url(Resources/KS-Skok2-prawo.png)");
        }
        else
        {
            AnimacjaGracza("url(Resources/KS-Skok2-lewo.png)");
        }
        grawitacja=10;
    }

    if(kierunek==1)
    {
        if(Odbilsie==0 && Czas<30*(Skok/100))
        {
            AnimacjaGracza("url(Resources/KS-Skok1-prawo.png)");
        }
        else if(Odbilsie==1)
        {
            AnimacjaGracza("url(Resources/KS-upadek.png)");
            Gracz.style.animationName = "Rotacja";
        }
        if(Odbilsie==0 && Czas>30*(Skok/100))
        {
            AnimacjaGracza("url(Resources/KS-Skok2-prawo.png)");
        }
        PozycjaX = PozycjaX+(CzyLewo*Skok/100)*1.2;
    }
    else if (kierunek==2)
    {
        if(Odbilsie==0 && Czas<30*(Skok/100))
        {
            AnimacjaGracza("url(Resources/KS-Skok1-lewo.png)");
        }
        else if(Odbilsie==1)
        {
            AnimacjaGracza("url(Resources/KS-upadek.png)");
            Gracz.style.animationName = "Rotacja";
        }
        if(Odbilsie==0 && Czas>30*(Skok/100))
        {
            AnimacjaGracza("url(Resources/KS-Skok2-lewo.png)");
        }
        PozycjaX = PozycjaX+(-CzyLewo*Skok/100)*1.2;
    }
    else
    {
        if(Strona==1)
        {
            AnimacjaGracza("url(Resources/KS-Skok1-prawo.png)");
        }
        else
        {
            AnimacjaGracza("url(Resources/KS-Skok1-lewo.png)");
        }
    }
    Gracz.style.left = PozycjaX + 'px';
    Gracz.style.top = PozycjaY + 'px';
    Czas+=1;
    NajblizszyObiekt=[null];
}