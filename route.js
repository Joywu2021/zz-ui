const MainRouter = () => {
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        //Home loading spinner
        loadingRequest().then(() => {
            const el = document.querySelector(".loader-container");
            if (el) {
                el.remove();  // removing the spinner element
                setLoading(false); // showing the app
            }
        });

        // console.log(window.location.href);
        if (token && !window.location.href.includes("/public/")) {
            checkTokenValid(token);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) { return null; }

    return (
        <Router>
            <Switch>
                <MainLayoutRoute exact auth="true" path="/" component={Home} />
                <MainLayoutRoute exact auth="true" path="/startout/about" component={About} />
                <MainLayoutRoute exact auth="true" path="/startout/vision" component={Vision} />
                <MainLayoutRoute exact auth="true" path="/startout/team" component={Team} />
                <MainLayoutRoute exact auth="true" path="/startout/terms" component={Terms} />
                <MainLayoutRoute exact auth="true" path="/startout/contact" component={Contact} />
                {/*<MainLayoutRoute exact auth="true" path="/startout/team" component={Team} />
                <MainLayoutRoute exact auth="true" path="/login" component={Login} />
                <MainLayoutRoute exact auth="true" path="/register" component={Register} /> */}
                <MainLayoutRoute auth="true" path="/public/profile/talent/:user/:profile" component={TalentPublicProfilePage} />
                {/* <MainLayoutRoute auth="true" path="/public/profile/talent/:entityKey" component={TalentPublicProfilePage} /> */}
                <MainLayoutRoute auth="true" path="/public/profile/investor/:user/:profile" component={InvestorPublicProfile} />
                <MainLayoutRoute auth="true" path="/public/profile/company/:user/:profile" component={CompanyPublicProfile} />
                <SinglePageLayoutRoute exact path='/signin' component={SignIn} />
                <SinglePageLayoutRoute exact path='/signup' component={SignUp} />
                <SinglePageLayoutRoute exact path='/changePassword' component={ChangePassword} />
                <SinglePageLayoutRoute exact path='/forgot' component={ForgotPassword} />
                {/* <SinglePageLayoutRoute exact path='/changePassword/:token' component={ChangePassword} /> */}
                <SinglePageLayoutRoute exact path="/verifyAccount" component={VerifyAccount} />
                <SinglePageLayoutRoute exact path="/resendVerifyCode" component={ResendVerifyCode} />
                <RouteUserCheckPermission />
            </Switch>
        </Router>
    )
}

export default MainRouter;