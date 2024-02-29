<script lang="ts">
    import { session } from '$lib/store/user';
    function test_function() {
        const username: string = (document.getElementById('username')! as HTMLInputElement).value;
        const email: string = (document.getElementById('email')! as HTMLInputElement).value;
        const password: string = (document.getElementById('password')! as HTMLInputElement).value;

        console.log('Clicked Submit');
        console.log({ username, email, password });

        window.location.href = '/user/dashboard';
        $session.auth = true;
    }
</script>

<div class="flex h-full flex-col items-center justify-center gap-10">
    <span class="v47_1297">Student Finance Tracker</span>

    <form on:submit={test_function}>
        <div class="max-w-80 rounded-3xl border border-black p-4" style="box-shadow:12px 15px">
            <div class="flex h-full flex-col items-stretch justify-center" style="margin-top:20px; margin-bottom:20px">
                <div class="grid grid-cols-2 grid-rows-4">
                    <span class="lbl">Username:</span>
                    <input type="text" id="username" />

                    <span class="lbl">Email:</span>
                    <input type="text" id="email" />

                    <span class="lbl">Password:</span>
                    <input type="password" id="password" />
                </div>

                <div class="flex h-full justify-center" style="width: 100%;">
                    <button type="submit" class="v47_1313 rounded-xl border border-black"> Register </button>
                </div>
            </div>
        </div>
    </form>
</div>

<style>
    .v47_1297 {
        width: 204px;
        color: rgba(233, 86, 120, 1);
        font-family: Roboto Condensed;
        font-weight: Bold;
        font-weight: Bold;
        font-size: 40px;
        opacity: 1;
        line-height: 1.2;
    }

    .v47_1313 {
        /* width: 100%; */
        color: rgba(41, 211, 152, 1);
        background-color: white;
        font-family: Roboto Condensed;
        font-weight: Bold;
        font-size: 18px;
        opacity: 1;
        text-align: center;
        padding: 8px;
        box-shadow: 4px 6px;
        width: 100px;
    }

    .lbl {
        font-family: Roboto Condensed;
        font-weight: Bold;
        align-self: end;
        margin-left: 15%;
    }

    #username,
    #email,
    #password {
        border: none; /* Remove border */
        background: none; /* Set background to transparent */
        outline: none; /* Remove outline */
        width: 100%; /* Set width to fill its container */
        height: 1px; /* Set height to a thin line */
        border-bottom: 1px solid black; /* Add a bottom border for the line effect */
    }
</style>
