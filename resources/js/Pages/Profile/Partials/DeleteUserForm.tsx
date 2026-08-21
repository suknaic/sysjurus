import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                    Excluir Conta
                </h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Uma vez que sua conta seja excluida, todos os seus recursos e dados serao permanentemente excluidos. Antes de excluir sua conta, baixe qualquer dado ou informacao que deseja manter.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Excluir Conta
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal} title="Excluir Conta">
                <form onSubmit={deleteUser}>
                    <p className="text-sm text-[var(--text-muted)] mb-6">
                        Tem certeza de que deseja excluir sua conta? Uma vez excluida, todos os seus recursos e dados serao permanentemente excluidos. Por favor, insira sua senha para confirmar que deseja excluir permanentemente sua conta.
                    </p>

                    <div>
                        <InputLabel htmlFor="password" value="Senha" className="sr-only" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1.5 block w-3/4"
                            isFocused
                            placeholder="Sua senha"
                        />
                        <InputError message={errors.password} className="mt-1.5" />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>
                        <DangerButton disabled={processing}>
                            {processing ? 'Excluindo...' : 'Excluir Conta'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
