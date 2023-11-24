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

var PozycjaX = 410*X;
var PozycjaY = 500*Y;

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
            Gracz.style.left = left - szybkosc+ 'px';
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
        PozycjaY = PozycjaY-(MocSkoku*(1.5*Y)*Skok/100);
        MocSkoku-=0.3+(0.3*((100-Skok)/100));
    }
    else if(Czas>=30*(Skok/100) && Czas<=60*(Skok/100))
    {
        PozycjaY = PozycjaY+(MocSkoku*(1.5*Y)*Skok/100);
        MocSkoku+=0.3+(0.3*((100-Skok)/100));
    }
    else
    {
        grawitacja=15*Y;
    }

    if(kierunek==1)
    {
        PozycjaX = PozycjaX+(CzyLewo*Skok/100)*(1.2*X);
    }
    else if (kierunek==2)
    {
        PozycjaX = PozycjaX+(-CzyLewo*Skok/100)*(1.2*X);
    }
    Gracz.style.left = PozycjaX + 'px';
    Gracz.style.top = PozycjaY + 'px';
    Czas+=1;
    NajblizszyObiekt=[null];
}