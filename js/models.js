// SIR model simulation

var SIR = function(S0,I0,R0, beta, alpha, n){
    var S = new Array();
    var I = new Array();
    var R = new Array();
    S[0]=S0;
    I[0]=I0;
    R[0]=R0;
    var bis;
    var ai;
    for(var t=1;t<n;t++){
        bis = beta*I[t-1]*S[t-1];
	ai = alpha*I[t-1];
	S[t]=S[t-1]-bis;
	I[t]=I[t-1]+bis-ai;
	R[t]=R[t-1]+ai;
    };
    return {S:S, I:I, R:R, n:n};
};

// SI model with or without binomial variation
var SI = function(S0, I0, beta, alpha, n, binom){
    var S = new Array();
    var I = new Array();
    S[0]=S0;
    I[0]=I0;
    var bis;
    var ai;  

    for(var t=1;t<n;t++){
	if(binom){
	    var Inew = rbinom(S[t-1],beta*I[t-1]);
	    var Rnew = rbinom(I[t-1],alpha);
	}else{
	    var Inew = beta*I[t-1]*S[t-1];
	    var Rnew = alpha*I[t-1];
	};
	S[t]=S[t-1]-Inew+Rnew;
	I[t]=I[t-1]+Inew-Rnew;
    };
    return {S:S, I:I, n:n};   
};

var EXP = function(N0, rho, n, poisson){
    var N = new Array();
    N[0]=N0;
    for(var t=1;t<n;t++){
	var mu = rho * N[t-1];
	if(poisson){
	    N[t]=rpois(mu);
	}else{
	    N[t]=mu;
	};           
    };
    return {N:N, n:n};
};

// a binomial random variable sample

var rbinom = function(n,p){
    // generate n runif(0,1) and count those < p
    var i;
    var out=0;
    for(i=0;i<n;i++){
	if(Math.random()<p){
	    out=out+1;
	};
    };
    return out;
}

var rpois = function( l ) {
    var p = 1, k = 0, L = Math.exp(-l);
    if (l>10){
	return l + rnorm()*Math.sqrt(l);
    };
    do {
	k++;
	p *= Math.random();
    } while (p > L);
    return k - 1;
};

var rnorm = function(){
    var u, v, x, y, q;
    do {
	u = Math.random();
	v = 1.7156 * ( Math.random() - 0.5 );
	x = u - 0.449871;
	y = Math.abs( v ) + 0.386595;
	q = x*x + y * ( 0.19600 * y - 0.25472 * x );
    } while( q > 0.27597 && ( q > 0.27846 || v*v > -4 * Math.log( u ) * u*u ));
    return v / u;
    
};