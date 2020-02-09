void parcurgere(int i,int &l)
{
    for (int j=1;j<=n;j++)
        if (a[i][j]==1&viz[j]==0)
        {
            c[l]=j;
            viz[j]=1;
            l++;
            parcurgere(j,l);
        }
}

void DF()
{
    int i,l=2;
    for (int i=1;i<=n;i++)
        viz[i]=0;
    cin>>i;
    viz[i]=1;
    c[1]=i;
    parcurgere(i,l);
    for (i=1;i<l;i++)
        cout<<c[i]<<" ";
}
///////////////////////////////////////////
void BF()
{
    int i,p,u;
    for (int i=1;i<=n;i++)
        viz[i]=0;
    cin>>i;
    viz[i]=1;
    p=u=1;
    c[p]=i;
    while (p<=u)
    {
        int x=c[p];
        for (int j=1;j<=n;j++)
            if (a[x][j]==1&&viz[j]==0)
            {
                u++;
                c[u]=j;
                viz[j]=1;
            }
        p++;
    }
    for (i=1;i<=u;i++)
        cout<<c[i]<<" ";
}
